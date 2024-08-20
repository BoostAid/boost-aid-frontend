import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@saasfly/ui";
import { buttonVariants } from "@saasfly/ui/button";
import * as Icons from "@saasfly/ui/icons";

import type { Locale } from "~/config/i18n-config";
import { getDictionary } from "~/lib/get-dictionary";

export const metadata = {
  title: "Create an account",
  description: "Create an account to get started.",
};

export default async function RegisterPage({
  params: { lang },
}: {
  params: {
    lang: Locale;
  };
}) {
  const dict = await getDictionary(lang);

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Link
        href={`/${lang}`}
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-4 top-4 md:left-8 md:top-8",
        )}
      >
        <Icons.ChevronLeft className="mr-2 h-4 w-4" />
        {dict.login.back}
      </Link>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <Image
            src="/images/avatars/BoostAidLogo.svg"
            className="mx-auto"
            width="128"
            height="128"
            alt=""
          />
          <h1 className="text-2xl font-semibold tracking-tight">
            {dict.login.join_now}
          </h1>
        </div>

        <Link
          href={`/${lang}/register/customer`}
          className={cn(buttonVariants({ variant: "default", size: "sm" }))}
        >
          Client
        </Link>

        <Link
          href={`/${lang}/register/community`}
          className={cn(buttonVariants({ variant: "default", size: "sm" }))}
        >
          Community
        </Link>

        <Link
          href={`/${lang}/register/company`}
          className={cn(buttonVariants({ variant: "default", size: "sm" }))}
        >
          Company
        </Link>

        <p className="px-8 text-center text-sm text-muted-foreground">
          By continuing, you agree to our{" "}
          <Link
            href={`/${lang}/terms`}
            className="hover:text-brand underline underline-offset-4"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href={`/${lang}/privacy`}
            className="hover:text-brand underline underline-offset-4"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
