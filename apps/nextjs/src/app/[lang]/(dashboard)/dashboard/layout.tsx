import { notFound, redirect } from "next/navigation";

import { authOptions, getCurrentUser } from "@saasfly/auth";

import { LocaleChange } from "~/components/locale-change";
import { MainNav } from "~/components/main-nav";
import { DashboardNav } from "~/components/nav";
import { SiteFooter } from "~/components/site-footer";
import { UserAccountNav } from "~/components/user-account-nav";
import { i18n, type Locale } from "~/config/i18n-config";
import { getDashboardConfig } from "~/config/ui/dashboard";
import { getDictionary } from "~/lib/get-dictionary";

interface DashboardLayoutProps {
  children?: React.ReactNode;
  params: {
    lang: Locale;
  };
}

export function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function DashboardLayout({
  children,
  params: { lang },
}: DashboardLayoutProps) {
  const dict = await getDictionary(lang);
  const user = await getCurrentUser(); // this has a server side env variable.
  if (!user) {
    redirect(authOptions?.pages?.signIn ?? "/login");
  }

  const dashboardConfig = await getDashboardConfig({ params: { lang } });
  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-20 items-center justify-between py-4">
          <MainNav
            items={dashboardConfig.mainNav}
            params={{ lang: `${lang}` }}
          />
          <div className="flex items-center space-x-3">
            {/* <LocaleChange url={"/dashboard"} /> */}
            <UserAccountNav
              user={{
                name: user.name,
                image: user.image,
                email: user.email,
                accountType: user.accountType,
              }}
              params={{ lang: `${lang}` }}
              dict={dict.dropdown}
            />
          </div>
        </div>
      </header>
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          {user.accountType === 'company' ? (
            <DashboardNav
            items={dashboardConfig.sidebarNavComp}
            params={{ lang: `${lang}` }}
            />
          ) : (
            <DashboardNav
            items={dashboardConfig.sidebarNav}
            params={{ lang: `${lang}` }}
            />
          )}
          {/* <DashboardNav
            items={dashboardConfig.sidebarNav}
            params={{ lang: `${lang}` }}
          /> */}
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
      <SiteFooter
        className="border-t border-border"
        params={{ lang: `${lang}` }}
        dict={dict.common}
      />
    </div>
  );
}
