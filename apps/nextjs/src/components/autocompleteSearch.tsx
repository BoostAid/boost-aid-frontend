"use client";

import React, {useState}from "react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";

import { env } from "~/env.mjs";

async function fetchQuestions(userToken: string, userId: number, path: string) {
  const response = await fetch(
    `${env.NEXT_PUBLIC_API_ROOT}/questions/${path}/${userId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    },
  );
  return await response.json();
}

export function AutocompleteSearch({ user, setQuestions, fetchQuestions }) {
  const [companies,setCompanies] = useState([]);

  const handleFetchQuestions = async (selectedKey: React.Key) => {
    const questionsData = await fetchQuestions(
      user.accessToken,
      selectedKey,
      "company",
    );
    console.log(selectedKey,questionsData );
    setQuestions(questionsData);
  };

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
    <Autocomplete
      defaultItems={companies}
      label="Select Company"
      placeholder="Search for a company"
      className="max-w-xs"
      onSelectionChange={handleFetchQuestions}
      onInputChange={handleInputChange}
    >
      {(company) => (
        <AutocompleteItem key={company.id} id={company.id.toString()}>
          {company.name}
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
}
