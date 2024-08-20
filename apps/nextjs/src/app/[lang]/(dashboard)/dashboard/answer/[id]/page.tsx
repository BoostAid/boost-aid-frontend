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

const AnswerDetailPage = () => {
  const { id } = useParams();
  // const router = useRouter();
  // const { qid } = router.query;
  const [answer, setAnswer] = useState(null);
  const [comments, setComments] = useState<Answer[]>([]);
  const [user, setUser] = useState<any[]>([]);
  const { isOpen, onOpen,onClose, onOpenChange } = useDisclosure();
  const [newComment, setNewComment] = useState("");

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
    const fetchAnswerDetails = async () => {
      if (user && user.accessToken) {
        const response = await fetch(
          `${env.NEXT_PUBLIC_API_ROOT}/answers/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.accessToken}`,
            },
          },
        );
        const data = await response.json();

        console.log("answer", data);

        setAnswer(data.answer); // Assuming the API returns both question and answers
      } else {
        console.error("User is not authenticated.");
      }
    };

    const fetchAnswerCommentsDetails = async () => {
      if (user && user.accessToken) {
      
        try {
          const response = await fetch(`https://boost-aid-rest.xyz/comments/answer/${id}`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${user.accessToken}`,
              'Content-Type': 'application/json'
            }
          });

          if (!response.ok) {
            // Handle HTTP errors
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const data = await response.json();
          console.log('Comments:', data.comments);
           setComments(data.comments);
        } catch (error) {
          console.error('Error fetching comments:', error);
        }
      } else {
        console.error("User is not authenticated.");
      }
    };

    if (user && id) {
      // Fetch question details only if user is set and id is available
      fetchAnswerDetails();
      fetchAnswerCommentsDetails();
    }
  }, [user, id]);

  if (!answer) {
    return <div>Loading...</div>;
  }

  const handleAddCommentCommunity = async (content,answerId,communityMemberId) => {
    if (content === ''){
      return;
    }

    const data = {
      content,
      answerId,
      communityMemberId
    };
  
    try {
      const response = await fetch('https://boost-aid-rest.xyz/comments/communityMember/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.accessToken}`
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error: ${errorData.message}`);
      }
  
      const result = await response.json();
      console.log('Comment created successfully:', result);
      setComments(prevComments => [...prevComments, result.comment]);
      onClose();
    } catch (error) {
      console.error('Failed to create comment:', error.message);
    } 
  };

  

  const handleAddCommentCustomer = async (content,answerId,customerId) => {
    if (content === ''){
      return;
    }

    const data = {
      content,
      answerId,
      customerId
    };
  
    try {
      const response = await fetch('https://boost-aid-rest.xyz/comments/customer/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.accessToken}`
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error: ${errorData.message}`);
      }
  
      const result = await response.json();
      console.log('Comment created successfully:', result);
      setComments(prevComments => [...prevComments, result.comment]);
      onClose();
    } catch (error) {
      console.error('Failed to create comment:', error.message);
    } 
  };

  return (
    <DashboardShell>
      <DashboardHeader heading="Comments for answer">
        {/* {user.accountType === "community" ? (
          // this should open up a modal
          <Button color="primary" onPress={onOpen}>
            Add comment
          </Button>
        ) : user.accountType === 'customer' ? (
          <Button color="primary" onPress={onOpen}>
            Add comment
          </Button>
        ) : null} */}

        <Button color="primary" onPress={onOpen}>
          Add comment
        </Button>
        
      </DashboardHeader>
      <div>
        <div className="divide-y divide-border rounded-md border">
          <div className="flex items-center justify-between p-4">
            <Textarea
              isReadOnly
              labelPlacement="outside"
              defaultValue={answer.content}
              className="divide-y divide-gray-200"
            />
          </div>
          <p>
            <small>
              Answer
            </small>
          </p>
          {comments.length > 0 ? (
            comments.map((comment) => (
              <>
                <div
                  key={comment.id}
                  className="flex items-center justify-between p-4"
                >
                  <Textarea
                    isReadOnly
                    labelPlacement="outside"
                    defaultValue={comment.content}
                    className="divide-y divide-gray-200"
                  />
                </div>

                    {(comment.customerId === null) ? (
                      <p>
                        <small>
                          Comment by community member at{" "}
                          {new Date(comment.createdAt).toLocaleString()}
                        </small>
                      </p>
                    ) : (
                      <p>
                        <small>
                          Comment by you at{" "}
                          {new Date(comment.createdAt).toLocaleString()}
                        </small>
                      </p>
                    )}
              </>
            ))
          ) : (
            <p>No comments yet.</p>
          )}
        </div>

        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  New comment
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
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                      />
                    </form>
                  </section>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  {user.accountType === "community" ? (
                    // community member upload 
                    <Button color="primary" onPress={() => handleAddCommentCommunity(newComment,id, user.userId)}>
                      Add Comment
                    </Button>
                  ) : user.accountType === 'customer' ? (
                    // customer sign up 
                    <Button color="primary" onPress={() => handleAddCommentCustomer(newComment,id, user.userId)}>
                      Add Comment
                    </Button>
                  ) : null}
                 
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </DashboardShell>
  );
};

export default AnswerDetailPage;
