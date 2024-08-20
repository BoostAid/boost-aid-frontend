import React from "react";
import { redirect } from "next/navigation";

import { authOptions, getCurrentUser } from "@saasfly/auth";

import { ClientDashboardComponent } from "~/components/client-dashboard-component";
import type { Locale } from "~/config/i18n-config";
import { getDictionary } from "~/lib/get-dictionary";

export const metadata = {
  title: "Dashboard",
};

// async function fetchQuestions(userToken: string, userId: number, path: string) {

//   const response = await fetch(`${env.NEXT_PUBLIC_API_ROOT}/questions/${path}/${userId}`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${userToken}`,
//     },
//   });
//   return await response.json();
// }

// export type ClusterType = RouterOutputs["k8s"]["getClusters"][number];

export default async function DashboardPage({
  params: { lang },
}: {
  params: {
    lang: Locale;
  };
}) {
  const user = await getCurrentUser(); // this has a server side env variable.
  if (!user) {
    redirect(authOptions?.pages?.signIn ?? "/login");
  }

  return <ClientDashboardComponent user={user} lang={lang} />;
}
