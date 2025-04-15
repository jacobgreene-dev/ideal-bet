// app/api/onrender/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { postPredictionRequest } from '@/lib/apiClient.server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = await postPredictionRequest(body);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Prediction route error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
