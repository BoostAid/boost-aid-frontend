import * as React from "react";
import Image from "next/image";
import { cn } from "@saasfly/ui";
import { ModeToggle } from "~/components/mode-toggle";

function getCopyrightText(
  dict: Record<string, string | Record<string, string>>,
) {
  const currentYear = new Date().getFullYear();
  const copyrightTemplate = String(dict.copyright);
  return copyrightTemplate?.replace("${currentYear}", String(currentYear));
}

export function SiteFooter({
  className,
  dict,
}: {
  className?: string;
  params: {
    lang: string;
  };
  dict: Record<string, string | Record<string, string>>;
}) {
  return (
    <footer className={cn(className)}>
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-1 md:px-0"> {/* Further reduced gap */}
          <div className="flex items-center gap-1"> {/* Further reduced gap */}
            <Image
              src="/images/avatars/BoostAidLogo.svg"
              width="100"
              height="100"
              alt="BoostAid Logo"
            />
            <Image
              src="/images/avatars/ShibaInuLogo.svg" // Ensure this path matches where your image is located
              width="33"
              height="33"
              alt="Shibarium Logo"
            />
          </div>
          <p className="text-center text-sm leading-loose md:text-left">
            {getCopyrightText(dict)}
          </p>
        </div>
      </div>
    </footer>
  );
}