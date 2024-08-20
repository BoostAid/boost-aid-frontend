"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Button,
  ButtonGroup,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import { getSession } from "next-auth/react";

import { DashboardHeader } from "~/components/header";
import { DashboardShell } from "~/components/shell";
// import { useUser } from "~/components/userContext";
import { env } from "~/env.mjs";

interface Answer {
  id: number;
  content: string;
  createdAt: string;
  // other relevant fields
}

const QuestionDetailPage = () => {
  const router = useRouter();
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [user, setUser] = useState<any[]>([]);
  const { isOpen, onOpen,onClose, onOpenChange } = useDisclosure();
  const [newAnswer, setNewAnswer] = useState("");
  const [heading, setHeading] = useState("");

  const[userType, setUserType] = useState("");

  const handleQuestionClick = (answerId) => {
    console.log('answers from question page',answerId);
    console.log('id from question page',id);
    router.push(`/dashboard/answer/${answerId}?qid=${id}`);
  };

  useEffect(() => {
    const fetchUserDetail = async () => {
      const sessionData = await getSession();
      setUser(sessionData.user);
    };

    if (id) {
      fetchUserDetail();
    }
  }, [id]);

  useEffect(() => {
    const fetchQuestionDetails = async () => {
      if (user && user.accessToken) {
        const response = await fetch(
          `${env.NEXT_PUBLIC_API_ROOT}/questions/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.accessToken}`,
            },
          },
        );
        const data = await response.json();

        console.log("question", data);

        setQuestion(data.question); // Assuming the API returns both question and answers
      } else {
        console.error("User is not authenticated.");
      }
    };

    const fetchQuestionAnswersDetails = async () => {
      if (user && user.accessToken) {
        const response = await fetch(
          `${env.NEXT_PUBLIC_API_ROOT}/answers/question/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.accessToken}`,
            },
          },
        );
        const data = await response.json();

        console.log("all answers", data.answers);

        if(data.answers === undefined){
          setAnswers([]);
           
        } else {
          setAnswers(data.answers); 
        }

      } else {
        console.error("User is not authenticated.");
      }
    };

    if (user && id) {
      // Fetch question details only if user is set and id is available
      fetchQuestionDetails();
      fetchQuestionAnswersDetails();

      if (user.accountType === "customer") {
        setHeading("Answers from experts");
        setUserType("customer");
      } else if (user.accountType === "community") {
        setHeading("Question from a customer");
        setUserType("community")
      }
    }
  }, [user, id]);

  if (!question) {
    return <div>Loading...</div>;
  }

  async function createAnswer(questionId, content, communityMemberId) {
    const data = {
      content,
      communityMemberId
    };
  
    try {
      const response = await fetch(`${env.NEXT_PUBLIC_API_ROOT}/answers/${questionId}/answers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.accessToken}`,
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error: ${errorData.message}`);
      }
  
      const result = await response.json();
   
      setAnswers(prevAnswers => [...prevAnswers, result.answer]);
      onClose();
    } catch (error) {
      console.error('Failed to create answer:', error.message);
    }
  }
  
  
  

  const handleAddAnswer = () => {
    createAnswer(id, newAnswer, user.userId);

    // if (newAnswer.trim()) {
    //   const newAnswerObj: Answer = {
    //     id: answers.length + 1,
    //     content: newAnswer,
    //     createdAt: new Date().toISOString(),
    //   };
    //   setAnswers([...answers, newAnswerObj]);
    //   setNewAnswer(""); // Clear input field after adding
    //   onOpenChange(false); // Close the modal
    // }
  };

  return (
    <DashboardShell>
      <DashboardHeader heading={heading}>
        {user.accountType === "community" ? (
          <Button color="primary" onPress={onOpen}>
            Add answer
          </Button>
        ) : null}
      </DashboardHeader>
      <div>
        <div className="divide-y divide-border rounded-md border">
          <div className="flex items-center justify-between p-4">
            <Textarea
              isReadOnly
              labelPlacement="outside"
              defaultValue={question.content}
              className="divide-y divide-gray-200"
            />
          </div>



          {userType === 'customer' ? (
              answers.length > 0 ? (
                answers.map((answer) => (
                  <>
                  <div key={answer.id} className="flex items-center justify-between p-4">
                    <Textarea
                      isReadOnly
                      labelPlacement="outside"
                      defaultValue={answer.content}
                      className="divide-y divide-gray-200"
                    />
                    
                    {user.accountType === 'customer' ? (
                      <div className="flex flex-col">
                        <Button
                          className="mb-1"
                          onClick={() => handleQuestionClick(answer.id)}
                        >
                          Go to answer
                        </Button>
                        <Button className="mt-1">
                          Select this answer as the best
                        </Button>
                      </div>
                    ) : user.accountType === 'community' ? (
                      <Button
                        className="mb-1"
                        onClick={() => handleQuestionClick(answer.id)}
                      >
                        Go to answer
                      </Button>
                    ) : null}
                    </div>
                    
                    <p>
                      <small>
                        Answered on {new Date(answer.createdAt).toLocaleString()}
                      </small>
                    </p>
                  </>
                ))
              ) : (
                <p>No answers yet.</p>
              )
            ) : userType === 'community' ? (
              answers.length > 0 ? (
                answers
                  .filter(answer => answer.communityMemberId === user.userId) 
                  .map((answer) => (
                    <>
                      <div key={answer.id} className="flex items-center justify-between p-4">
                        <Textarea
                          isReadOnly
                          labelPlacement="outside"
                          defaultValue={answer.content}
                          className="divide-y divide-gray-200"
                        />
                        
                        {user.accountType === 'customer' ? (
                          <div className="flex flex-col">
                            <Button
                              className="mb-1"
                              onClick={() => handleQuestionClick(answer.id)}
                            >
                              Go to answer
                            </Button>
                            <Button className="mt-1">
                              Select this answer as the best
                            </Button>
                          </div>
                        ) : user.accountType === 'community' ? (
                          <Button
                            className="mb-1"
                            onClick={() => handleQuestionClick(answer.id)}
                          >
                            Go to answer
                          </Button>
                        ) : null}
                      </div>
                        <p>
                        <small>
                          Answered on {new Date(answer.createdAt).toLocaleString()}
                        </small>
                      </p>
                    </>
                  ))
              ) : (
                <p>No answers yet.</p>
              )
            ) : null}


        </div>

        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  New question
                </ModalHeader>
                <ModalBody>
                  <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
                    <form
                      className="w-full space-y-4 p-4"
                      style={{ fontSize: "1.2em" }}
                    >
                      <Textarea
                        fullWidth
                        label="Your Answer"
                        placeholder="Type your answer here..."
                        value={newAnswer}
                        onChange={(e) => setNewAnswer(e.target.value)}
                      />
                    </form>
                  </section>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" onPress={handleAddAnswer}>
                    Add Answer
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </DashboardShell>
  );
};

export default QuestionDetailPage;
