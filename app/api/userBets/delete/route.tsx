import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { adminDb } from "@/lib/firebaseAdmin";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { index }: { index: number } = await req.json();
  const userEmail = session.user.email;
  const docRef = adminDb.collection("userBets").doc(userEmail);
  const docSnap = await docRef.get();

  if (!docSnap.exists) {
    return NextResponse.json({ error: "No user bets found" }, { status: 404 });
  }

  const data = docSnap.data();
  const bets = data?.bets || [];

  if (index < 0 || index >= bets.length) {
    return NextResponse.json({ error: "Invalid index" }, { status: 400 });
  }

  bets.splice(index, 1);

  await docRef.set({ ...data, bets });

  return NextResponse.json({ message: "Bet deleted" });
}
