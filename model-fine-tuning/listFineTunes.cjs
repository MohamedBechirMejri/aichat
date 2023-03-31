import { openai } from "./api.cjs";

async function listFineTunes() {
  try {
    const response = await openai.listFineTunes();
    console.log("data: ", response.data.data);
  } catch (err) {
    console.log("error:", err);
  }
}

listFineTunes();
