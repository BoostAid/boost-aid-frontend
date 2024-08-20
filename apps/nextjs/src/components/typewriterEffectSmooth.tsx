"use client";

import { TextGenerateEffect } from "@saasfly/ui/typewriter-effect";

export function TypewriterEffectSmooths() {
  const words = [
    {
      text: "Is",
    },
    {
      text: "BoostAid",
    },
    {
      text: "actually",
    },
    {
      text: "useful?",
    },
    {
      text: "See",
      className: "text-red-500",
    },
    {
      text: "answers",
      className: "text-red-500",
    },
    {
      text: "below",
      className: "text-red-500",
    },
  ];
  return (
    <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
      <TextGenerateEffect words={words} />
    </p>
  );
}