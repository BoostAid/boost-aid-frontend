"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

import { cn } from "@saasfly/ui";
import * as Icons from "@saasfly/ui/icons";

import { MobileNav } from "~/components/mobile-nav";
import type { MainNavItem } from "~/types";

interface MainNavProps {
  items?: MainNavItem[];
  children?: React.ReactNode;
  params: {
    lang: string;
  };
}

export function MainNav({ items, children, params: { lang } }: MainNavProps) {
  const segment = useSelectedLayoutSegment();
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false);

  const toggleMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const handleMenuItemClick = () => {
    toggleMenu();
  };

  return (
    <div
      className="flex pt-6" // Increased top padding
      style={{
        gap: '0.5rem',
        marginLeft: '-1rem', // Move logos to the left
        transform: 'translateY(-0.5rem)', // Move logos up
      }}
    >
      <Link href={`/${lang}`} className="hidden items-center md:flex">
        <div>
          <Image
            src="/images/avatars/BoostAidLogo.svg"
            width="150"
            height="150"
            alt="BoostAid Logo"
          />
        </div>
      </Link>

      <Link href={`/${lang}`} className="hidden items-center md:flex">
        <div>
          <Image
            src="/images/avatars/ShibaInuLogo.svg"
            width="45"
            height="45"
            alt="Shiba Inu Logo"
          />
        </div>
      </Link>

      <button
        className="flex items-center space-x-2 md:hidden"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        {showMobileMenu ? <Icons.Close /> : <Icons.Logo />}
        <span className="font-bold">Menu</span>
      </button>

      {showMobileMenu && items && (
        <MobileNav items={items} menuItemClick={handleMenuItemClick}>
          {children}
        </MobileNav>
      )}
    </div>
  );
}