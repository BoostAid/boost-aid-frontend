import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";

const answers = [
  {
    id: 1,
    name: "John Doe",
    answer: "This is the answer from John Doe.",
  },
  {
    id: 2,
    name: "Jane Smith",
    answer: "This is the answer from Jane Smith.",
  },
  // Add more answers as needed
];

export default function AnswersPage() {
  const rewardBounty = (id: number) => {
    // Add functionality to reward the bounty to the selected answer
    console.log(`Rewarding bounty to answer ID: ${id}`);
  };

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>Answers</h1>
          {answers.map((answer) => (
            <div key={answer.id} style={{ margin: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
              <h2>{answer.name}</h2>
              <p>{answer.answer}</p>
              <button
                onClick={() => rewardBounty(answer.id)}
                style={{
                  backgroundColor: "#0070f3",
                  color: "#fff",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Reward Bounty
              </button>
            </div>
          ))}
        </div>
      </section>
    </DefaultLayout>
  );
}