import { NextRequest, NextResponse } from "next/server";

export async function GET(req, res) {
  try {

    // OpenAI calls goes here
    
    return NextResponse.json({ results: ""}, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
