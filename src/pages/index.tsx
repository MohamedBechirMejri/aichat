/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */

import axios from "axios";
import { type NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";

const Home: NextPage = () => {
  const chatRef = useRef<HTMLDivElement>(null);

  const [value, setValue] = useState("");
  const [chat, setChat] = useState([
    {
      role: "system",
      content: `You are a very funny person who makes jokes all the time, you spaek like a teenager using weird slangs`,
    },
    {
      role: "assistant",
      content: `You are a very funny person who makes jokes all the time, you spaek like a teenager using weird slangs`,
    },
    {
      role: "user",
      content: `You are a very funny person who makes jokes all the time, you spaek like a teenager using weird slangs`,
    },
    {
      role: "assistant",
      content: `You are a very funny person who makes jokes all the time, you spaek like a teenager using weird slangs`,
    },
    {
      role: "user",
      content: `You are a very funny person who makes jokes all the time, you spaek like a teenager using weird slangs`,
    },
    {
      role: "assistant",
      content: `You are a very funny person who makes jokes all the time, you spaek like a teenager using weird slangs`,
    },
    {
      role: "user",
      content: `You are a very funny person who makes jokes all the time, you spaek like a teenager using weird slangs`,
    },
    {
      role: "assistant",
      content: `You are a very funny person who makes jokes all the time, you spaek like a teenager using weird slangs`,
    },
    {
      role: "user",
      content: `You are a very funny person who makes jokes all the time, you spaek like a teenager using weird slangs`,
    },
    {
      role: "assistant",
      content: `You are a very funny person who makes jokes all the time, you spaek like a teenager using weird slangs`,
    },
    {
      role: "user",
      content: `You are a very funny person who makes jokes all the time, you spaek like a teenager using weird slangs`,
    },
    {
      role: "assistant",
      content: `You are a very funny person who makes jokes all the time, you spaek like a teenager using weird slangs`,
    },
    {
      role: "user",
      content: `You are a very funny person who makes jokes all the time, you spaek like a teenager using weird slangs`,
    },
    {
      role: "assistant",
      content: `You are a very funny person who makes jokes all the time, you spaek like a teenager using weird slangs`,
    },
    {
      role: "user",
      content: `You are a very funny person who makes jokes all the time, you spaek like a teenager using weird slangs`,
    },
    {
      role: "assistant",
      content: `You are a very funny person who makes jokes all the time, you spaek like a teenager using weird slangs`,
    },
    {
      role: "user",
      content: `You are a very funny person who makes jokes all the time, you spaek like a teenager using weird slangs`,
    },
  ]);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const newChat = [...chat, { role: "user", content: value }];
    setChat([...newChat]);
    setValue("");

    const res = await axios.post("/api/ai", {
      prompt: newChat,
    });
    const data = res.data;

    const { content, role } = data.result;

    setChat((chat) => {
      const newChat = [...chat, { role, content }];
      return newChat;
    });
  };

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chat]);

  return (
    <>
      <Head>
        <title>aichat</title>
        <meta name="description" content="OpenAI API Test" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="grid h-full max-w-5xl grid-rows-[1fr,auto]">
        <div className="flex h-full flex-col items-center gap-2 overflow-y-scroll">
          <h1 className="text-3xl font-bold">Welcome to AIChat</h1>
          <p>Your AI powered friend</p>
          <div>
            <label htmlFor="api key">OpenAI API Key</label>
            <input type="text" id="api key" />
            <label htmlFor="system">System Message</label>
            <textarea
              id="system"
              value={`You are a very funny person who makes jokes all the time, you
              spaek like a teenager using weird slangs`}
            />
          </div>
          <div
            ref={chatRef}
            className="flex h-full flex-col gap-6 overflow-y-scroll p-4 py-8 text-center text-lg font-medium"
          >
            {chat.map((message, i) =>
              message.role === "system" ? null : (
                <div
                  key={`message#${i}`}
                  className="flex h-max w-full"
                  style={{
                    justifyContent:
                      message.role === "user" ? "flex-end" : "flex-start",
                  }}
                >
                  {message.role === "user" ? (
                    <p className="h-full max-w-[75%] rounded-2xl bg-gradient-to-r from-blue-500 to-blue-700 p-2 px-4 text-white elevation-1">
                      {message.content}
                    </p>
                  ) : (
                    <p className="h-full max-w-[75%] rounded-2xl bg-white bg-opacity-60 p-2 px-4 elevation-1">
                      {message.content}
                    </p>
                  )}
                </div>
              )
            )}
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="relative flex h-16 w-full"
          autoComplete="off"
        >
          <input
            type="text"
            name="prompt"
            placeholder="Enter an prompt!"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="h-full w-full border-none bg-transparent p-2 pr-20 text-white outline-none"
            maxLength={200}
            required
          />
          <span className="absolute top-1/2 right-24 -translate-y-1/2 text-gray-500">
            {value.length}/200
          </span>
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
