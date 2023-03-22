/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/restrict-plus-operands */

import type { NextApiRequest, NextApiResponse } from "next";

import {
  type ChatCompletionRequestMessage,
  Configuration,
  OpenAIApi,
} from "openai";

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

  const prompt: ChatCompletionRequestMessage[] = req.body.prompt;

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: generatePrompt(prompt),
    });
    // @ts-ignore
    res.status(200).json({ result: completion.data.choices[0].message });
  } catch (error) {
    // @ts-ignore
    if (error.response)
      // @ts-ignore
      res.status(error.response.status).json(error.response.data);
    else
      res.status(500).json({
        error: { message: "An error occurred during your request." },
      });
  }
}

function generatePrompt(prompt: ChatCompletionRequestMessage[]) {
  return [...prompt];
}
