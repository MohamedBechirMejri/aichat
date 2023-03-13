/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */

import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";

const Home: NextPage = () => {
  const [value, setValue] = useState("");
  const [chat, setChat] = useState([
    {
      sender: "system",
      text: "This is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly.",
    },
    {
      sender: "bot",
      text: "Hello! How can I help you today?",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);
    const newChat = [
      ...chat,
      {
        sender: "user",
        text: value,
      },
      {
        sender: "bot",
        text: "",
      },
    ];
    setChat([...newChat]);
    setValue("");
    const prompt = newChat
      .map((message) => `${message.sender}: ${message.text}`)
      .filter((m, i) => i === 0 || i > newChat.length - 8)
      .join("\n");

    const res = await fetch("/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });
    const data = await res.json();

    setChat((chat) => {
      const newChat = [...chat];
      newChat[newChat.length - 1]!.text = data.result;
      return newChat;
    });
    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>aichat</title>
        <meta name="description" content="OpenAI API Test" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-[100svh] flex-col items-center justify-between bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <h1 className="p-8 text-3xl font-bold">OpenAI API Test</h1>
        {loading ? (
          <p className="animate-pulse">...</p>
        ) : (
          <div className="p-4 text-center text-xl font-medium">
            {chat.map((message, i) =>
              message.sender === "system" ? null : (
                <p key={`message#${i}`}>
                  {" "}
                  {message.sender}: {message.text}
                </p>
              )
            )}
          </div>
        )}
        <form
          onSubmit={handleSubmit}
          className="relative flex h-12 w-full"
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
