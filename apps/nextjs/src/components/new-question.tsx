"use client";

import { useState } from "react";
import { Textarea } from "@nextui-org/input";
import { Button, Input, Slider } from "@nextui-org/react";

export function NewQuestion() {
  const [bounty, setBounty] = useState(0);
  const [timeInterval, setTimeInterval] = useState(0);
  const [company, setCompany] = useState("");
  const [question, setQuestion] = useState("");

  async function addquestion(event: React.FormEvent) {}

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <form className="w-full space-y-4 p-4" style={{ fontSize: "1.2em" }}>
        <Textarea
          fullWidth
          label="Your Question"
          placeholder="Type your question here..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <div className="flex items-center gap-2">
          <Slider
            step={1}
            max={100}
            min={0}
            value={bounty}
            onChange={(value) => setBounty(value)}
            className="max-w-md"
          />
          <Input
            label="Bounty Amount"
            type="number"
            value={String(bounty)}
            onChange={(e) => setBounty(Number(e.target.value))}
          />
        </div>
        <div className="flex items-center gap-2">
          <Slider
            step={1}
            max={72}
            min={1}
            value={timeInterval}
            onChange={(value) => setTimeInterval(value)}
            className="max-w-md"
          />
          <Input
            label="Max Response Time (Hours)"
            type="number"
            value={String(timeInterval)}
            onChange={(e) => setTimeInterval(Number(e.target.value))}
          />
        </div>
        <Input
          label="Company Name"
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
        <Button color="primary" onClick={addquestion}>
          Add Question
        </Button>
      </form>
    </section>
  );
}
