/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */

import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { type NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import Settings from "~/components/Settings";
import { TbSettings2 } from "react-icons/tb";
import { TfiClose } from "react-icons/tfi";

const Home: NextPage = () => {
  const chatRef = useRef<HTMLDivElement>(null);

  const [value, setValue] = useState("");
  const [chat, setChat] = useState([
    {
      role: "system",
      content: `the assistant is called sam. it's your best friend! you can talk about anything with no restrictions.`,
    },
  ]);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [model, setModel] = useState("gpt-3.5-turbo");
  const [systemMessage, setSystemMessage] = useState(
    `the assistant is called sam. it's your best friend! you can talk about anything with no restrictions.`
  );

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const newChat = [...chat, { role: "user", content: value }];
    newChat[0]!.content =
      systemMessage ||
      `the assistant is called sam. it's your best friend! you can talk about anything with no restrictions.`;
    setChat([...newChat]);
    setValue("");

    const res = await axios.post("/api/ai", { prompt: newChat, apiKey, model });
    const data = res.data;

    const { content, role } = data.result;

    setChat((chat) => {
      const newChat = [
        ...chat,
        { role: role || "assistant", content: content || data.result },
      ];
      return newChat;
    });
  };

  const handleClear = () => {
    setChat([{ role: "system", content: systemMessage }]);
  };

  useEffect(() => {
    if (model !== "text-davinci-003" && model !== "gpt-3.5-turbo")
      setSystemMessage(
        "the assistant is called mel, she will provide info about the company (vision vortexes) and answer your questions."
      );
    else
      setSystemMessage(
        "the assistant is called sam. it's your best friend! you can talk about anything with no restrictions."
      );
  }, [model]);

  useEffect(() => {
    if (chatRef.current)
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [chat]);

  return (
    <>
      <Head>
        <title>aichat</title>
        <meta name="description" content="OpenAI API Test" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="mx-auto grid h-full w-[min(64rem,100svw)] max-w-5xl grid-rows-[1fr,auto]">
        <button
          className="fixed top-4 right-4 z-10 text-2xl"
          onClick={() => setIsSettingsOpen(!isSettingsOpen)}
        >
          {isSettingsOpen ? <TfiClose /> : <TbSettings2 />}
        </button>
        <AnimatePresence>
          {!isSettingsOpen ? (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex h-full flex-col items-center gap-2 overflow-x-visible overflow-y-scroll"
              >
                <h1 className="flex gap-1 text-3xl font-bold">
                  <span>Welcome to</span>
                  <span className="flex bg-gradient-to-tl from-blue-600 to-rose-400 bg-clip-text text-transparent">
                    AIChat
                  </span>
                </h1>
                <p className="font-medium">Your AI powered friend</p>
                <div
                  ref={chatRef}
                  className="flex h-full w-full flex-col gap-6 overflow-x-visible overflow-y-scroll scroll-smooth p-4 py-8 text-center text-base font-medium"
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
                          <motion.p
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: [0.9, 1.1, 1] }}
                            transition={{
                              delay: 0.2,
                              ease: "easeIn",
                            }}
                            className="h-full max-w-[75%] rounded-2xl bg-gradient-to-r from-blue-500 to-blue-700 p-2 px-4 text-white elevation-1"
                          >
                            {message.content}
                          </motion.p>
                        ) : (
                          <motion.p
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: [0.9, 1.1, 1] }}
                            transition={{
                              delay: 0.2,
                              ease: "easeIn",
                            }}
                            className="h-full max-w-[75%] rounded-2xl bg-white bg-opacity-60 p-2 px-4 elevation-1"
                          >
                            {message.content}
                          </motion.p>
                        )}
                      </div>
                    )
                  )}
                  {chat[chat.length - 1]?.role === "user" && (
                    <p className="animate-pulse px-4 text-left text-2xl font-bold">
                      ...
                    </p>
                  )}
                </div>
              </motion.div>
              <motion.form
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="relative grid h-[6.5rem] w-full grid-cols-[auto,1fr] gap-2 px-4"
                autoComplete="off"
              >
                <motion.button
                  initial={{ width: "3rem", y: 0 }}
                  whileHover={{ width: "9rem" }}
                  whileTap={{ y: 1.5 }}
                  transition={{
                    duration: 0.4,
                    ease: "easeIn",
                    y: { duration: 0.1, ease: "linear" },
                  }}
                  className="group flex h-12 flex-nowrap items-center justify-start gap-2 overflow-hidden rounded-full bg-gradient-to-r from-blue-500 to-blue-700 p-2 px-3 font-bold text-white"
                  type="button"
                  onClick={handleClear}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="white"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 shrink-0"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M20.7024 2.07782C20.3937 1.9095 20.0071 2.02326 19.8387 2.33191L14.7415 11.679C14.1315 11.2867 12.5639 10.42 11.3923 11.0061C10.3929 11.5061 10.1645 11.9182 9.7972 12.5811L9.75982 12.6485L17.4519 16.3461C17.8157 15.5976 18.0392 14.7269 17.7579 13.977C17.4612 13.1858 16.5737 12.5962 15.8846 12.2419L20.9565 2.94145C21.1248 2.6328 21.011 2.24614 20.7024 2.07782ZM9.05827 13.7646L9.08017 13.7343L16.7805 17.4359C16.6758 17.5743 16.5752 17.6958 16.4848 17.7962L12.9912 21.8721C12.7862 22.1113 12.4811 22.2405 12.1701 22.1901C11.4069 22.0663 9.9278 21.7116 8.93156 20.7456C8.80688 20.6246 8.85936 20.4169 9.00607 20.324C9.86774 19.7781 10.625 18.4374 10.625 18.4374C10.625 18.4374 9.05827 19.4999 7.0625 19.4374C5.52782 19.3893 3.64397 17.9429 2.85543 17.2771C2.6979 17.144 2.76842 16.8923 2.96968 16.8476C4.24898 16.5636 7.68904 15.6473 9.05827 13.7646Z"
                    />
                    <path d="M8.60974 9.02978C8.52129 8.8234 8.22871 8.82341 8.14026 9.02978L7.77833 9.87431C7.70052 10.0559 7.55586 10.2005 7.37431 10.2783L6.52978 10.6403C6.3234 10.7287 6.32341 11.0213 6.52978 11.1097L7.37431 11.4717C7.55586 11.5495 7.70052 11.6941 7.77833 11.8757L8.14026 12.7202C8.22871 12.9266 8.52129 12.9266 8.60974 12.7202L8.97167 11.8757C9.04948 11.6941 9.19414 11.5495 9.37569 11.4717L10.2202 11.1097C10.4266 11.0213 10.4266 10.7287 10.2202 10.6403L9.37569 10.2783C9.19414 10.2005 9.04948 10.0559 8.97167 9.87431L8.60974 9.02978Z" />
                    <path d="M14.0511 5.99109C13.9847 5.8363 13.7653 5.8363 13.6989 5.99109L13.4275 6.62448C13.3691 6.76064 13.2606 6.86914 13.1245 6.92749L12.4911 7.19895C12.3363 7.26528 12.3363 7.48472 12.4911 7.55105L13.1245 7.82251C13.2606 7.88086 13.3691 7.98936 13.4275 8.12552L13.6989 8.75891C13.7653 8.9137 13.9847 8.9137 14.0511 8.75891L14.3225 8.12552C14.3809 7.98936 14.4894 7.88086 14.6255 7.82251L15.2589 7.55105C15.4137 7.48472 15.4137 7.26528 15.2589 7.19895L14.6255 6.92749C14.4894 6.86914 14.3809 6.76064 14.3225 6.62448L14.0511 5.99109Z" />
                  </svg>
                  <span className="min-w-max shrink-0 opacity-0 transition-all group-hover:opacity-100">
                    New Topic
                  </span>
                </motion.button>
                <div className="relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 2048 2048"
                    className="absolute top-4 left-4 h-4 w-4"
                    fill="#898989"
                  >
                    <path d="M0 1984q0-26 8-54t15-53q23-95 48-188t48-188q-59-110-89-230T0 1026q0-141 36-272t103-246 160-207 208-161T752 37t272-37q141 0 271 36t245 104 207 160 161 207 103 244 37 272q0 140-36 270t-103 245-159 208-206 161-244 104-271 37q-124 0-244-28t-230-86L79 2046q-10 2-15 2-27 0-45-18t-19-46zm1020-64q124 0 239-32t215-90 182-139 141-182 91-215 32-239q0-124-32-238t-90-214-141-181-182-140-214-90-238-32q-123 0-237 32t-214 90-181 139-140 181-91 213-32 238q0 65 8 120t23 107 36 105 48 109q8 16 8 31 0 11-6 41t-16 69-21 84-23 86-20 74-13 50q68-16 134-32t135-33q34-8 71-19t72-11q8 0 15 2t15 6q54 25 104 45t102 35 105 22 115 8zM704 896q-26 0-45-19t-19-45q0-26 19-45t45-19h640q26 0 45 19t19 45q0 26-19 45t-45 19H704zm0 384q-26 0-45-19t-19-45q0-26 19-45t45-19h384q26 0 45 19t19 45q0 26-19 45t-45 19H704z" />
                  </svg>
                  <motion.textarea
                    initial={{ height: "3rem" }}
                    animate={{ height: value ? "6rem" : "3rem" }}
                    transition={{ duration: 0.5, ease: "easeIn" }}
                    name="prompt"
                    placeholder="Ask me Anything..."
                    value={value}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") void handleSubmit(e);
                    }}
                    onChange={(e) => setValue(e.target.value)}
                    className="flex w-full resize-none items-center justify-center rounded-[1.5rem] bg-white bg-opacity-60 p-3 px-12 outline-none elevation-1 placeholder:text-[#898989]"
                    maxLength={200}
                    required
                  />
                  {value && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ delay: 0.5 }}
                      className="absolute bottom-2 right-4 -translate-y-1/2 text-xs text-gray-500"
                    >
                      {value.length}/200
                    </motion.span>
                  )}
                  {value && (
                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ delay: 0.2 }}
                      type="submit"
                      className="absolute right-4 top-4 w-6 fill-blue-700"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 2048 2048"
                      >
                        <path d="M64 1920q-28 0-46-18t-18-47q0-7 2-17l189-658q5-17 19-30t32-16l878-139q14-2 22-11t8-24q0-14-8-23t-22-12L242 786q-18-3-32-16t-19-30L2 82Q0 72 0 65q0-28 18-46T64 0q15 0 27 6l1920 896q17 8 27 23t10 35q0 19-10 34t-27 24L91 1914q-12 6-27 6z" />
                      </svg>
                    </motion.button>
                  )}
                </div>
              </motion.form>
            </>
          ) : (
            <Settings
              apiKey={apiKey}
              setApiKey={setApiKey}
              model={model}
              setModel={setModel}
              systemMessage={systemMessage}
              setSystemMessage={setSystemMessage}
            />
          )}
        </AnimatePresence>
      </main>
    </>
  );
};

export default Home;
