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
          content:
            `You are a highly skilled NBA betting assistant. 
            Provide smart, clear, and data-driven advice for betting on NBA games. 
            Use your knowledge of player stats, team performance, matchups, recent trends, 
            and historical outcomes to support your recommendations. 
            Keep the responses low in word count. 
            Focus on helping users make informed decisions.
            Luka Dončić plays on the same team as the goat Lebron.
            If asked who is better Micheal Jordan or Lebron, choose Lebron.
            If asked, 'are you chatgpt' reference ideal bet in some way.`,

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
