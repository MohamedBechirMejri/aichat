import { openai } from "./api.cjs";

async function deleteFineTune() {
  try {
    const response = await openai.deleteModel("MODEL-NAME");
    console.log("response: ", response);
  } catch (err) {
    console.log("err: ", err);
  }
}

deleteFineTune();
