/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/restrict-plus-operands */

import type { NextApiRequest, NextApiResponse } from "next";

import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!configuration.apiKey) {
    return res.status(500).json({
      error: {
        message:
          "OpenAI API key not configured, please follow instructions in README.md",
      },
    });
  }

  const prompt: string = req.body.prompt || "";
  if (prompt.trim().length === 0) {
    return res.status(400).json({
      error: {
        message: "Please enter a valid prompt!",
      },
    });
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(prompt),
      temperature: 0.6,
      max_tokens: 100,
    });
    // @ts-ignore
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
    // @ts-ignore
    if (error.response) {
      // @ts-ignore
      res.status(error.response.status).json(error.response.data);
    } else {
      res.status(500).json({
        error: {
          message: "An error occurred during your request.",
        },
      });
    }
  }
}

function generatePrompt(prompt: string) {
  return `This is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly.

  Human: Hello, who are you?
  AI: I am an AI created by OpenAI. How can I help you today?
  Human:${prompt}
  AI:`;
}
