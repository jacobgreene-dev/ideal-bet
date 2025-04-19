import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { adminDb } from "@/lib/firebaseAdmin";
import { Bet } from "@/lib/types/apiTypes";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      console.error("Unauthorized: No session or user email found.");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userEmail = session.user.email;
    const { gameEvent }: { gameEvent: Bet["bets"][0]["gameEvent"] } = await req.json();

    console.log("Received gameEvent payload:", gameEvent);

    if (
      !gameEvent ||
      !gameEvent.bet_type ||
      !gameEvent.teams?.home ||
      !gameEvent.teams?.away ||
      !gameEvent.user_team ||
      typeof gameEvent.model_prob !== "number"
    ) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const userDocRef = adminDb.collection("userBets").doc(userEmail);
    const userDoc = await userDocRef.get();

    const newBet = {
      gameEvent,
      createdAt: new Date().toISOString(),
    };

    if (userDoc.exists) {
      const userData = userDoc.data();
      const existingBets = Array.isArray(userData?.bets) ? userData.bets : [];

      await userDocRef.set({
        ...userData,
        bets: [...existingBets, newBet],
      });
    } else {
      await userDocRef.set({
        userID: userEmail,
        bets: [newBet],
      });
    }

    console.log("✅ Bet saved successfully");
    return NextResponse.json({ message: "Bet saved successfully" });
  } catch (error) {
    console.error("Error saving user bet:", error);
    return NextResponse.json({ error: "Failed to save bet" }, { status: 500 });
  }
}
