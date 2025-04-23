import OpenAI from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Set in .env.local
});

export async function POST(req: Request) {
  const { prompt } = await req.json();

  try {
    const chat = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are an NBA betting assistant. Give helpful, clear, data-backed suggestions.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const response = chat.choices[0].message?.content || 'No response.';
    return NextResponse.json({ response });
  } catch (error) {
    console.error('OpenAI error:', error);
    return NextResponse.json({ response: 'Error generating response.' }, { status: 500 });
  }
}
