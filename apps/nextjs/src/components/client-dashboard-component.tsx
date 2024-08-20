"use client";

import React, { useEffect, useState } from "react";

import {
  Table,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@saasfly/ui/table";

import { AutocompleteSearch } from "~/components/autocompleteSearch";
import { DashboardHeader } from "~/components/header";
import { K8sCreateButton } from "~/components/k8s/cluster-create-button";
import { ClusterItem } from "~/components/k8s/cluster-item";
import { DashboardShell } from "~/components/shell";
import type { Locale } from "~/config/i18n-config";
import { env } from "~/env.mjs";
import { getDictionary } from "~/lib/get-dictionary";

async function fetchQuestions(userToken: string, userId: number, path: string) {
  const response = await fetch(
    `${env.NEXT_PUBLIC_API_ROOT}/questions/${path}/${userId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    },
  );
  return await response.json();
}

export async function ClientDashboardComponent({ lang, user }) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [header, setHeader] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      if (user.accountType === "customer") {
        try {
          const questionsData = await fetchQuestions(
            user.accessToken,
            user.userId,
            "user",
          );
          setQuestions(questionsData);
          setHeader("Your Questions");
        } catch (error) {
          console.error("Failed to fetch questions:", error);
        }
      } else if (user.accountType === "community") {
        setHeader("Questions Available to Answer");
      } else if (user.accountType === "company") {
        try {
          const questionsData = await fetchQuestions(
            user.accessToken,
            user.userId,
            "company",
          );
          setQuestions(questionsData);
          setHeader("Live Company Questions");
        } catch (error) {
          console.error("Failed to fetch questions:", error);
        }
      }
    };

    fetchData();
  }, [user]);

  if (questions !== null) {
    console.log("questions", questions);
  }

  // const dict = await getDictionary(lang);
  return (
    <DashboardShell>
      <DashboardHeader heading={header}>
        {user.accountType === "customer" ? (
          <K8sCreateButton
            question="New Question"
            user={user}
            setQuestions={setQuestions}
            fetchQuestions={fetchQuestions}
          />
        ) : user.accountType === "community" ? (
          <AutocompleteSearch
            user={user}
            fetchQuestions={fetchQuestions}
            setQuestions={setQuestions}
          />
        ) : null}
      </DashboardHeader>
      <div>
        <div className="divide-y divide-border rounded-md border">
          <div className="flex items-center justify-between p-4">
            <Table className="divide-y divide-gray-200">
              <TableHeader>
                <TableRow className="hover:bg-gray-50">
                  <TableHead>Question</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Asked At</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>

              

              {questions &&
              questions.questions &&
              questions.questions.length > 0 ? (
                questions.questions.map((question: any) => (
                  <ClusterItem
                    key={String(question.id)}
                    question={question}
                    user={user}
                  />
                ))
              ) : (
                <TableRow>
                  <TableHead colSpan={5} className="text-center">
                    No questions available.
                  </TableHead>
                </TableRow>
              )}
            </Table>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
