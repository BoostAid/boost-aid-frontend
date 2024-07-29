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
        <form className="w-full max-w-lg p-4 space-y-4">
          <Input
            fullWidth
            label="Your Question"
            placeholder="Type your question here..."
          />
          <div className="flex flex-col gap-2">
            <label htmlFor="bounty-slider">Bounty Amount: {bounty}</label>
            <Slider
              id="bounty-slider"
              step={1}
              maxValue={100}
              minValue={0}
              defaultValue={10}
              onValueChange={setBounty}
              className="max-w-md"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="time-slider">Time Interval (Days): {timeInterval}</label>
            <Slider
              id="time-slider"
              step={1}
              maxValue={30}
              minValue={1}
              defaultValue={7}
              onValueChange={setTimeInterval}
              className="max-w-md"
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