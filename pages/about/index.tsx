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
              <p className="text-xl mb-4">
                Boost-Aid is a question and answer platform designed to help users get answers to their questions quickly and efficiently. Here's how it works:
              </p>
              <ol className="list-decimal list-inside text-left mb-4 space-y-2">
                <li>
                  <strong>Ask a Question</strong>: Users can post their questions on the platform. To make the question more appealing to potential answerers, users can attach a bounty to their question.
                </li>
                <li>
                  <strong>Set a Bounty</strong>: The bounty is a reward that users offer to anyone who provides a satisfactory answer. The higher the bounty, the more likely it is to attract attention from knowledgeable individuals.
                </li>
                <li>
                  <strong>Select Max Response Time</strong>: Users can specify the maximum amount of time their question will remain open for answers. After this period, the question will be closed to new responses.
                </li>
                <li>
                  <strong>Get Answers</strong>: Once the question is posted, other users can view it and submit their answers. The question poster can then review the answers and choose the one that best solves their query.
                </li>
                <li>
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