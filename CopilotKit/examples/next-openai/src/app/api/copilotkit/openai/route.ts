import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = "edge";

function extractJsonFromString(text) {
  const jsonMatch = text.match(/```json([\s\S]*?)```/);
  if (jsonMatch && jsonMatch[1]) {
    return jsonMatch[1].trim();
  }
  return null;
}

export async function POST(req: Request): Promise<Response> {
  try {
    const forwardedProps = await req.json();

    const stream = openai.beta.chat.completions
      .stream({
        model: "gpt-4-1106-preview",
        ...forwardedProps,
        stream: true,
      })
      .toReadableStream();

    return new Response(stream);
  } catch (error) {
    return new Response("", { status: 500, statusText: error.error.message });
  }
}

// GET endpoint for Chat Completions
export async function GET(req: Request): Promise<Response> {
  try {
    
    //grab data from prompt inside json object

    const { prompt } = await req.json();

    console.log(prompt);

    return new Response(prompt);
  }
  catch (error) {
    console.log(error)
    return new Response("", { status: 500, statusText: error });
  }
}

    // // Step 1: Create an Assistant
    // const kanbanAssistant = await openai.beta.assistants.retrieve("asst_foiyetbjGm2PKz2ekiYpdF3V");
    // console.log(kanbanAssistant);

    // // Step 2: Create a Thread
    // const thread = await openai.beta.threads.create();
    // const threadId = thread.id;

    // // Step 3: Add a Message to a Thread
    // const userMessage = await openai.beta.threads.messages.create(threadId, {
    //   role: "user",
    //   content: prompt,
    // });

    // // Step 4: Run the Assistant
    // const run = await openai.beta.threads.runs.create(threadId, {
    //   assistant_id: kanbanAssistant.id,
    // });

    // // Step 5: Check the Run status
    // let runStatus = await openai.beta.threads.runs.retrieve(threadId, run.id);

    // // Polling loop to wait for the completion of the run
    // while (runStatus.status === "in_progress") {
    //   await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second
    //   console.log("Polling for run completion");
    //   runStatus = await openai.beta.threads.runs.retrieve(threadId, run.id);
    // }

    // // Step 6: Display the Assistant's Response
    // const assistantResponse = await openai.beta.threads.messages.list(threadId);

    // console.log("Assistant Response:");
    // console.log(assistantResponse.data[0].content[0].text.value);

    // const jsonString = extractJsonFromString(assistantResponse.data[0].content[0].text.value);
    // if (jsonString) {
    //   // Parse the JSON content without additional escaping
    //   const parsedJson = JSON.parse(jsonString, null, 2);

    //   // Return the parsed JSON
    //   return new Response(parsedJson);
    // } else {
    //   // Return the raw text
    //   return new Response("", { status: 500, statusText: "No JSON content found in response" });
    // }

