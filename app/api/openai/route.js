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
    09/10/2024	Adobe Creative Cloud	Software	-$29.99
    09/12/2024	Peloton Digital	Fitness	-$12.99
    09/15/2024	Microsoft 365	Software	-$6.99
    09/17/2024	Calm Meditation App	Wellness	-$5.99
    09/20/2024	Dropbox	Cloud Services	-$9.99
    09/22/2024	The New York Times Digital Subscription	News	-$9.99
    09/25/2024	HBO Max	Entertainment	-$14.99
    09/28/2024	Disney+	Entertainment	-$7.99
    09/30/2024	Audible	Books/Audio	-$14.95
    Closing Balance: $2,322.16`;

export async function GET(req, res) {
  try {
    const prePrompt = "Please interpret the following bank statements: \n";
    const postPrompt =
      "\nDo I have any recurring subscriptions?" +
      "You must always return just the JSON with NO additional description or context. No escape characters either.";

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
