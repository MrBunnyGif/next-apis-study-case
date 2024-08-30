import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const POST = async (req) => {
  console.log("🚀 ~ POST ~ req:", req)
  const { userId, prompt, tag } = await req.json();
  try {
    await connectToDB();
    const newPrompt = new Prompt({
      creator: userId,
      tag,
      prompt,
    });

    await newPrompt.save();
    return new Response(JSON.stringify(newPrompt), {
      status: 201,
    });
  } catch (error) {
    console.error("POST ~ error:", error);
  }
};
