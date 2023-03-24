/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */

import axios from "axios";
import { motion } from "framer-motion";
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
          <h1 className="flex gap-1 text-3xl font-bold">
            <span>Welcome to</span>
            <span className="flex bg-gradient-to-tl from-blue-600 to-rose-400 bg-clip-text text-transparent">
              AIChat
            </span>
          </h1>
          <p>Your AI powered friend</p>
          {/* <div>
            <label htmlFor="api key">OpenAI API Key</label>
            <input type="text" id="api key" />
            <label htmlFor="system">System Message</label>
            <textarea
              id="system"
              value={`You are a very funny person who makes jokes all the time, you
              spaek like a teenager using weird slangs`}
            />
          </div> */}
          <div
            ref={chatRef}
            className="flex h-full flex-col gap-6 overflow-y-scroll p-4 py-8 text-center text-base font-medium"
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
          className="relative grid h-[6.5rem] w-full grid-cols-[auto,1fr]"
          autoComplete="off"
        >
          <div className="p-24"></div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 2048 2048"
            className="absolute top-4 left-[13.25rem] h-4 w-4"
            fill="#898989"
          >
            <path d="M0 1984q0-26 8-54t15-53q23-95 48-188t48-188q-59-110-89-230T0 1026q0-141 36-272t103-246 160-207 208-161T752 37t272-37q141 0 271 36t245 104 207 160 161 207 103 244 37 272q0 140-36 270t-103 245-159 208-206 161-244 104-271 37q-124 0-244-28t-230-86L79 2046q-10 2-15 2-27 0-45-18t-19-46zm1020-64q124 0 239-32t215-90 182-139 141-182 91-215 32-239q0-124-32-238t-90-214-141-181-182-140-214-90-238-32q-123 0-237 32t-214 90-181 139-140 181-91 213-32 238q0 65 8 120t23 107 36 105 48 109q8 16 8 31 0 11-6 41t-16 69-21 84-23 86-20 74-13 50q68-16 134-32t135-33q34-8 71-19t72-11q8 0 15 2t15 6q54 25 104 45t102 35 105 22 115 8zM704 896q-26 0-45-19t-19-45q0-26 19-45t45-19h640q26 0 45 19t19 45q0 26-19 45t-45 19H704zm0 384q-26 0-45-19t-19-45q0-26 19-45t45-19h384q26 0 45 19t19 45q0 26-19 45t-45 19H704z" />
          </svg>
          <motion.textarea
            animate={{ height: value ? "6rem" : "3rem" }}
            name="prompt"
            placeholder="Ask me Anything..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="flex resize-none items-center justify-center rounded-[1.5rem] bg-white bg-opacity-60 p-3 px-12 outline-none elevation-1 placeholder:text-[#898989]"
            maxLength={200}
            required
          />
          {value && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.2 }}
              className="absolute bottom-1 left-[13rem] -translate-y-1/2 text-xs text-gray-500"
            >
              {value.length} <br />
              /200
            </motion.span>
          )}
          {value && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.2 }}
              type="submit"
              className="absolute right-4 top-5 w-6 fill-blue-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048">
                <path d="M64 1920q-28 0-46-18t-18-47q0-7 2-17l189-658q5-17 19-30t32-16l878-139q14-2 22-11t8-24q0-14-8-23t-22-12L242 786q-18-3-32-16t-19-30L2 82Q0 72 0 65q0-28 18-46T64 0q15 0 27 6l1920 896q17 8 27 23t10 35q0 19-10 34t-27 24L91 1914q-12 6-27 6z"></path>
              </svg>
            </motion.button>
          )}
        </form>
      </main>
    </>
  );
};

export default Home;
