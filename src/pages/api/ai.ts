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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prompt: ChatCompletionRequestMessage[] = req.body.prompt;
  const { model, apiKey }: { model: string; apiKey: string } = req.body;

  if (!prompt || !model)
    return res.status(400).json({
      error: {
        message:
          "You must provide a prompt, model, and API key to use this endpoint.",
      },
    });

  const configuration = new Configuration({
    apiKey: apiKey || process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  if (model === "gpt-3.5-turbo") {
    const completion = await openai.createChatCompletion({
      model,
      messages: [...prompt],
    });
    // @ts-ignore
    res.status(200).json({ result: completion.data.choices[0].message });
  } else {
    const completion = await openai.createCompletion({
      model,
      prompt: generatePrompt(prompt),
      max_tokens: 100,
      stop: ["\n"],
    });
    // @ts-ignore
    res.status(200).json({ result: completion.data.choices[0].text });
  }
}

const generatePrompt = (prompt: ChatCompletionRequestMessage[]) => {
  const promptString =
    prompt
      .map((msg, i) =>
        i === 0 || i > prompt.length - 10 ? `${msg.role}: ${msg.content}\n` : ""
      )
      .join("") + "assistant: ";
  return promptString;
};
