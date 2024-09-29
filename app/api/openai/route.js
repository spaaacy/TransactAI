export const dynamic = "force-dynamic";


import { NextRequest, NextResponse } from "next/server.js";
import OpenAI from "openai";
const openai = new OpenAI(process.env.OPENAI_API_KEY);

const statement = `BANK OF FICTIONAL
    Account Statement for: Aakif Mohamed
    Account Number: 1234-5678-9012
    Statement Period: September 1, 2024 - September 30, 2024
    Opening Balance: $2,500.00
    
    Transaction Details:
    Date	Description	Category	Amount
    09/02/2024	Spotify Premium	Entertainment	-$9.99
    09/03/2024	Netflix	Entertainment	-$15.99
    09/05/2024	Apple iCloud Storage	Cloud Services	-$2.99
    09/07/2024	Amazon Prime	Shopping	-$14.99
    Closing Balance: $2,322.16`;

export async function GET(req, res) {
  try {
    const prePrompt = "Please interpret the following bank statements: \n";
    const postPrompt =
      "\nDo I have any recurring subscriptions?" +
      'You must always return just the JSON with NO additional description or context. No escape characters either. The object should be called recurring_subscriptions, with keys "description" and "price".';

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prePrompt + statement + postPrompt }],
    });

    return NextResponse.json(
      { results: completion.choices[0].message.content },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
