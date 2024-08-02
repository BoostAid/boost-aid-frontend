import { useState } from "react";
import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { Input, Button, Slider } from "@nextui-org/react";

export default function DocsPage() {
  const [bounty, setBounty] = useState(10);
  const [timeInterval, setTimeInterval] = useState(7);

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>New Question</h1>
        </div>
        <form className="w-full max-w-lg p-4 space-y-4" style={{ fontSize: '1.2em' }}>
          <Input
            fullWidth
            label="Your Question"
            placeholder="Type your question here..."
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
              width="100px"
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
              width="100px"
              label="Max Response Time (Hours)"
              type="number"
              value={String(timeInterval)}
              onChange={(e) => setTimeInterval(Number(e.target.value))}
            />
          </div>
          <Button type="submit" color="primary" auto>
            Ask Question
          </Button>
        </form>
      </section>
    </DefaultLayout>
  );
}