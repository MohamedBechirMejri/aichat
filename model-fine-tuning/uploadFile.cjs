import { openai } from "./api.cjs";
import fs from "fs";

async function upload() {
  try {
    const response = await openai.createFile(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      fs.createReadStream("./data/prepared.jsonl"),
      "fine-tune"
    );
    console.log("File ID: ", response.data.id);
  } catch (err) {
    console.log("err: ", err);
  }
}

upload();
