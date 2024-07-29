// pages/index.tsx
import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import DefaultLayout from "@/layouts/default";

export default function IndexPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>Boost&nbsp;</h1>
          <h1 className={title({ color: "violet" })}>Aid&nbsp;</h1>
          <br />
          <h1 className={title()}>
            An amazing Q&A platform for all your needs.
          </h1>
          <h4 className={subtitle({ class: "mt-4" })}>
            Fast, beautiful, and modern platform for quick answers.
          </h4>
        </div>

        {/* You can add other sections or components here if needed */}
        
      </section>
    </DefaultLayout>
  );
}