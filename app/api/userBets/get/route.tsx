import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { adminDb } from "@/lib/firebaseAdmin";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.redirect(new URL("/auth/signin", req.url));
    }

    const userEmail = session.user.email;
    const userDocRef = adminDb.collection("userBets").doc(userEmail);
    const userDoc = await userDocRef.get();

    if (!userDoc.exists) {
      return NextResponse.json({ bets: [] });
    }

    const data = userDoc.data();
    return NextResponse.json({ bets: data?.bets || [] });
  } catch (error) {
    console.error("userBets/get: Error fetching user bets:", error);
    return NextResponse.json({ error: "Failed to fetch user bets" }, { status: 500 });
  }
}
