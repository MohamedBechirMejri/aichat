import { openai } from "./api.cjs";

async function createFineTune() {
  try {
    const response = await openai.createFineTune({
      training_file: "your-file-name",
      model: "davinci",
    });
    console.log("response: ", response);
  } catch (err) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    console.log("error: ", err.response.data.error);
  }
}

createFineTune();
