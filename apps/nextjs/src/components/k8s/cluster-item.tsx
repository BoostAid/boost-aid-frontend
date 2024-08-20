"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import * as Icons from "@saasfly/ui/icons";
import { TableBody, TableCell, TableRow } from "@saasfly/ui/table";

import { formatDate } from "~/lib/utils";
import type { Question } from "~/types/k8s";

interface ClusterItemProps {
  question: Pick<
    Question,
    "id" | "content" | "companyId" | "bountyAmount" | "status" | "createdAt"
  >;
  user: any;
}

export function ClusterItem({ question, user }: ClusterItemProps) {
  const [companyName, setCompanyName] = useState<string | null>(null);
  const router = useRouter();

  const handleQuestionClick = () => {
    router.push(`dashboard/question/${question.id}`);
  };

  useEffect(() => {
    async function fetchCompany() {
      if (question.companyId) {
        try {
          const response = await fetch(`https://boost-aid-rest.xyz/companies/${question.companyId}`, {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${user.accessToken}`,
              "Content-Type": "application/json",
            },
          });

          if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
          }

          const data = await response.json();
          setCompanyName(data.company.name);
        } catch (error) {
          console.error("Error fetching company:", error);
          setCompanyName("Unknown Company"); // Fallback in case of error
        }
      }
    }

    fetchCompany();
  }, [question.companyId, user.accessToken]);

  return (
    <TableBody
      className="divide-y divide-gray-100 cursor-pointer"
      onClick={handleQuestionClick}
    >
      <TableRow key={String(question.id)}>
        <TableCell className="font-medium">
          <Link
            href={`/editor/cluster/${String(question.id)}`}
            className="font-semibold hover:underline"
          >
            {question.content}
          </Link>
        </TableCell>

        <TableCell className="text-left">{companyName || "Loading..."}</TableCell>

        <TableCell className="text-left">
          {formatDate(question.createdAt)}
        </TableCell>

        <TableCell className="text-left">{question.status}</TableCell>

        <TableCell className="text-right">
          <Icons.ChevronRight className="mr-2 h-4 w-4" />
        </TableCell>
      </TableRow>
    </TableBody>
  );
}
