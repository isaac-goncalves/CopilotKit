import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY  
})

// this endpoint will have to return the json with data to build a kanban with the data based on a user promp of what he wnats to do 
// also it will receive prompts from the user based on the contents of the json/kanban and return the json/kanban with the changes
// the user will be able to add and remove items from the kanban and the json will be updated accordingly

export const runtime = 'edge'


export async function POST (req: Request): Promise<Response> {
  try {
    const forwardedProps = await req.json()

    // const completion = await openai.chat.completions.create({
    //   messages: [
    //     {
    //       role: "system",
    //       content: "You are a helpful assistant designed to output JSON.",
    //     },
    //     { role: "user", content: "Who won the world series in 2020?" },
    //   ],
    //   model: "gpt-3.5-turbo-1106",
    //   response_format: { type: "json_object" },
    // });
    // console.log(completion.choices[0].message.content);

    const stream = openai.beta.chat.completions
      .stream({
        model: 'gpt-3.5-turbo',
        ...forwardedProps,
        stream: true
      })
      .toReadableStream()
    // console.log(stream)

    return new Response(stream);
  } catch (error) {
    return new Response('', { status: 500, statusText: error.error.message })
  }
}
