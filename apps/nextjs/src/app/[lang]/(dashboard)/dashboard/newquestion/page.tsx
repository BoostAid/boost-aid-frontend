"use client";

import { redirect } from "next/navigation";

import { authOptions, getCurrentUser } from "@saasfly/auth";

import { DashboardHeader } from "~/components/header";
import { NewQuestion } from "~/components/new-question";
import { DashboardShell } from "~/components/shell";

export default async function QuestionsPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect(authOptions?.pages?.signIn ?? "/login");
  }
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Add your question"
        // text="Manage account and website settings."
      />
      <div className="grid gap-10">
        <NewQuestion />
      </div>
    </DashboardShell>
  );
}
