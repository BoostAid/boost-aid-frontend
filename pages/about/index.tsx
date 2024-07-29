import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { Card, CardBody } from "@nextui-org/react";

export default function AboutPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-3xl text-center justify-center">
          <h1 className={title()}>About Boost-Aid</h1>
          <Card className="mt-6 shadow-lg">
            <CardBody className="p-6">
              <p className="text-lg mb-4">
                Boost-Aid is a question and answer platform designed to help users get answers to their questions quickly and efficiently. Here's how it works:
              </p>
              <ol className="list-decimal list-inside text-left mb-4">
                <li className="mb-2">
                  <strong>Ask a Question</strong>: Users can post their questions on the platform. To make the question more appealing to potential answerers, users can attach a bounty to their question.
                </li>
                <li className="mb-2">
                  <strong>Set a Bounty</strong>: The bounty is a reward that users offer to anyone who provides a satisfactory answer. The higher the bounty, the more likely it is to attract attention from knowledgeable individuals.
                </li>
                <li className="mb-2">
                  <strong>Select a Time Interval</strong>: Users can specify the length of time their question will remain active. After this period, the question will be closed to new answers.
                </li>
                <li className="mb-2">
                  <strong>Get Answers</strong>: Once the question is posted, other users can view it and submit their answers. The question poster can then review the answers and choose the one that best solves their query.
                </li>
                <li className="mb-2">
                  <strong>Award the Bounty</strong>: The user who posted the question can award the bounty to the best answer, providing an incentive for high-quality responses.
                </li>
              </ol>
              <p className="text-lg">
                Boost-Aid aims to create a vibrant community where users can share their knowledge and get the help they need. Join us and start boosting your knowledge today!
              </p>
            </CardBody>
          </Card>
        </div>
      </section>
    </DefaultLayout>
  );
}