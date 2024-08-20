import type { Locale } from "~/config/i18n-config";
import { getDictionary } from "~/lib/get-dictionary";
import type { DashboardConfig } from "~/types";

export const getDashboardConfig = async ({
  params: { lang },
}: {
  params: {
    lang: Locale;
  };
}): Promise<DashboardConfig> => {
  const dict = await getDictionary(lang);

  return {
    mainNav: [
      {
        title: dict.common.dashboard.main_nav_documentation,
        href: "/docs",
      },
      {
        title: dict.common.dashboard.main_nav_support,
        href: "/support",
        disabled: true,
      },
    ],
    sidebarNav: [
      {
        id: "liveQuestions",
        title: "Live Questions",
        href: "/dashboard/",
      },
      {
        id: "answeredQuestions",
        title: "Answered Questions",
        href: "/dashboard/",
      },
    ],
    sidebarNavComp: [
      {
        id: "liveQuestions",
        title: "Live Questions",
        href: "/dashboard/",
      },
      {
        id: "answeredQuestions",
        title: "Answered Questions",
        href: "/dashboard/",
      },
      {
        id: "analytics",
        title: "Analytics Data",
        href: "/dashboard/analytics",
      },
    ],
  };
};
