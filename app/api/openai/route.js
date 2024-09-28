import { NextRequest, NextResponse } from "next/server.js";
import OpenAI from "openai";
const openai =  new OpenAI(process.env.OPENAI_API_KEY);


export async function GET(req, res) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {"role": "user", "content": "write a haiku about ai"}
      ]
    });
    console.log(completion.choices[0].message);
    // OpenAI calls goes here
    
    return NextResponse.json({ results: completion.choices[0].message.content}, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
