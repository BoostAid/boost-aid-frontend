"use client";

import Link from "next/link";
import type { User } from "next-auth";
import { signOut } from "next-auth/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@saasfly/ui/dropdown-menu";

import { UserAvatar } from "~/components/user-avatar";

interface UserAccountNavProps extends React.HTMLAttributes<HTMLDivElement> {
  user: Pick<User, "name" | "image" | "email" | "accountType">;
  params: {
    lang: string;
  };
  dict: Record<string, string>;
}

export function UserAccountNav({
  user,
  params: { lang },
  dict,
}: UserAccountNavProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar
          user={{ name: user.name ?? null, image: user.image ?? null }}
          className="h-8 w-8"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {user.name && <p className="font-medium">{user.name}</p>}
            {user.email && (
              <p className="w-[200px] truncate text-sm text-muted-foreground">
                {user.email}
              </p>
            )}
            {user.accountType && (
              <p className="font-medium">Account type: {user.accountType}</p>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={`/${lang}/dashboard`}>{dict.dashboard}</Link>
        </DropdownMenuItem>
        {/* <DropdownMenuItem asChild>
          <Link href={`/${lang}/dashboard/billing`}>{dict.billing}</Link>
        </DropdownMenuItem> */}
        <DropdownMenuItem asChild>
          <Link href={`/${lang}/dashboard/settings`}>Account</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onSelect={(event) => {
            event.preventDefault();
            signOut({
              callbackUrl: `${process.env.NEXT_PUBLIC_APP_URL}/${lang}`,
            }).catch((error) => {
              console.error("Error during sign out:", error);
            });
          }}
        >
          {dict.sign_out}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
