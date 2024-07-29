import { useEffect, useState } from "react";
import { Card, Button } from "@nextui-org/react";
import DefaultLayout from "@/layouts/default";
import { title } from "@/components/primitives";

interface Question {
  id: number;
  text: string;
  bounty: number;
  time: number; // time in hours
}

// Dummy data fetching function
const fetchOngoingQuestions = async (): Promise<Question[]> => {
  return [
    { id: 1, text: "How to use NextUI?", bounty: 50, time: 24 },
    { id: 2, text: "How to manage state in React?", bounty: 30, time: 12 },
  ];
};

export default function OngoingQuestionsPage() {
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const loadQuestions = async () => {
      const data = await fetchOngoingQuestions();
      setQuestions(data);
    };

    loadQuestions();
  }, []);

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>Ongoing Questions</h1>
        </div>
        <div className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
          {questions.map((question) => (
            <Card key={question.id} className="w-full max-w-md p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-semibold">{question.text}</h2>
                  <p>Bounty: {question.bounty}</p>
                  <p>Time: {question.time} hours</p>
                </div>
                <Button auto>See Answers</Button>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </DefaultLayout>
  );
}