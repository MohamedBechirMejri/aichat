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
      content:
        "You are a very funny person who makes jokes all the time, you spaek like a teenager using weird slangs",
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
      <main className="flex h-[100svh] flex-col items-center justify-between bg-gradient-to-b from-[#261f30] to-[#090a1f] text-white">
        <h1 className="p-8 text-3xl font-bold">OpenAI API Test</h1>

        <div
          ref={chatRef}
          className="h-full w-full overflow-y-scroll text-center text-xl font-medium"
        >
          {chat.map((message, i) =>
            message.role === "system" ? null : (
              <p
                key={`message#${i}`}
                className="h-max w-full p-4"
                style={{
                  backgroundColor:
                    message.role === "user" ? "#000000" : "#ffffff11",
                }}
              >
                {message.content || (
                  <span className="animate-pulse text-xl">...</span>
                )}
              </p>
            )
          )}
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
