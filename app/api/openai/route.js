import { NextRequest, NextResponse } from "next/server.js";
import OpenAI from "openai";
const openai =  new OpenAI(process.env.OPENAI_API_KEY);
const pdfUtil = require('pdf-to-text');
const pdf_path = "public/sample.pdf";

export async function GET(req, res) {

  const prePrompt = "Please interpret the following bank statements: \n";
  const postPrompt= "\nDo I have any recurring subscriptions?" + 
  "You must always return just the JSON with NO additional description or context. No escape characters either.";

  try {

  pdfUtil.pdfToText(pdf_path, async function(err, data){
    if (err) throw(err);
    console.log(prePrompt + data + postPrompt);
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {"role": "user", "content": prePrompt + data + postPrompt}
      ]
    });
    console.log(completion.choices[0].message);
  });
  

    // OpenAI calls goes here
    
    return NextResponse.json({ results: completion.choices[0].message.content}, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
