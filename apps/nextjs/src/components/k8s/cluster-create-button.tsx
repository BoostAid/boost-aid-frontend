// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
"use client";

import * as React from "react";
// import { NewQuestion } from "~/components/new-question";

import { useRef, useState } from "react";
//navigate to new page
import { useRouter } from "next/navigation";
import { Textarea } from "@nextui-org/input";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";

// import { trpc } from "~/trpc/client";

import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Slider,
  useDisclosure,
} from "@nextui-org/react";

import { cn } from "@saasfly/ui";
//button self design
import { buttonVariants, type ButtonProps } from "@saasfly/ui/button";
import * as Icons from "@saasfly/ui/icons";
import { toast } from "@saasfly/ui/use-toast";

import { env } from "~/env.mjs";

interface K8sCreateButtonProps extends ButtonProps {
  customProp?: string;
  dict: Record<string, unknown>;
  question?: string;
}

export async function K8sCreateButton({
  className,
  variant,
  dict,
  question,
  setQuestions,
  fetchQuestions,
  user,
  ...props
}: K8sCreateButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [companies,setCompanies] = useState([]);

  const bountyRef = useRef(null);
  const timeIntervalRef = useRef(null);
  const companyRef = useRef(null);
  const questionContentRef = useRef(null);

  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  async function addQuestion() {
    const data = {
      content: questionContentRef.current.value,
      bountyAmount: Number(bountyRef.current.value),
      customerId: user.userId,
      companyId: companyRef.current,
    };

    try {
      const response = await fetch(`${env.NEXT_PUBLIC_API_ROOT}/questions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: user.accessToken,
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        console.log("Success:", result);
        onClose();
        // trigger rerender of questions to show the q
        const questionsData = await fetchQuestions(
          user.accessToken,
          user.userId,
          "user",
        );
        setQuestions(questionsData);
      } else {
        console.error("Error:", result);
        // add toast with an error.
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  }

  async function handleCompanySelection(selectedKey: React.Key) {
    companyRef.current = selectedKey;
    console.log(selectedKey);
  }

  async function fetchCompaniesByName(name: string, userToken: string) {
    const response = await fetch(
      `${env.NEXT_PUBLIC_API_ROOT}/companies/search?name=${name}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      },
    );

    const data = await response.json();
    console.log('fetched companies',data);
    try{
      if(data.companies.length > 0){
        setCompanies(data.companies);
      }
    } catch (e){

    }
  }

  const handleInputChange = (value) => {
    if (value.length > 0) {
      fetchCompaniesByName(value, user.accessToken);
    }
    console.log(value);
  };

  return (
    <>
      <button
        onClick={onOpen}
        className={cn(
          buttonVariants({ variant }),
          {
            "cursor-not-allowed opacity-60": isLoading,
          },
          className,
        )}
        disabled={isLoading}
        {...props}
      >
        {isLoading ? (
          <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.Add className="mr-2 h-4 w-4" />
        )}
        {question}
      </button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="4xl">
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
                      label="Your Question"
                      placeholder="Type your question here..."
                      ref={questionContentRef}
                    />
                    <div className="flex items-center gap-2">
                      {/* <Slider
                        step={1}
                        max={100}
                        min={0}
                        defaultValue={0}
                        ref={bountyRef}
                        className="max-w-md"
                      /> */}
                      <Input
                        label="Bounty Amount"
                        type="number"
                        ref={bountyRef}
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      {/* <Slider
                        step={1}
                        max={72}
                        min={1}
                        defaultValue={1}
                        ref={timeIntervalRef}
                        className="max-w-md"
                      /> */}
                      <Input
                        label="Max Response Time (Hours)"
                        type="number"
                        ref={timeIntervalRef}
                      />
                    </div>
                    {/* <Input label="Company Name" type="text" ref={companyRef} /> */}
                    
                    <Autocomplete
                      defaultItems={companies}
                      label="Select Company"
                      placeholder="Search for a company"
                      onSelectionChange={handleCompanySelection}
                      onInputChange={handleInputChange}
                    >
                      {(company) => (
                        <AutocompleteItem key={company.id} id={company.id.toString()}>
                          {company.name}
                        </AutocompleteItem>
                      )}
                    </Autocomplete>

                  </form>
                </section>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onClick={addQuestion}>
                  Add Question
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
