/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */

import React from "react";
import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";

const Home: NextPage = () => {
  const [value, setValue] = useState("");
  const [result, setResult] = useState();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: value }),
    });
    const data = await res.json();
    setResult(data.result);
    setLoading(false);
    setValue("");
  };

  return (
    <>
      <Head>
        <title>aichat</title>
        <meta name="description" content="OpenAI API test" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-[100svh] flex-col items-center justify-between bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <h1 className="p-8 text-3xl font-bold">OpenAI API test</h1>
        {loading ? (
          <p className="animate-pulse">...</p>
        ) : (
          <p className="p-4 text-center text-xl font-medium">
            {result || ":)"}
          </p>
        )}
        <form
          onSubmit={handleSubmit}
          className="flex h-12 w-full"
          autoComplete="off"
        >
          <input
            type="text"
            name="prompt"
            placeholder="Enter an prompt!"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="h-full w-full border-none bg-transparent p-2 text-white outline-none"
          />
          <button
            type="submit"
            className="w-24 bg-gradient-to-br from-[#2e026d] to-[#15162c]"
          >
            Submit
          </button>
        </form>
      </main>
    </>
  );
};

export default Home;
