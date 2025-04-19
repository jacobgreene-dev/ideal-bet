// app/my-bets/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { adminDb } from "@/lib/firebaseAdmin";
import { redirect } from "next/navigation";

import Header from "@/app/components/Header"
import Footer from "@/app/components/Footer"
import BetCard from "@/app/components/SavedBetCard"

import { SavedBet } from "@/lib/types/apiTypes";

export default async function MyBetsPage() {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
        redirect("/login");
    }

    const userEmail = session.user.email;
    const userDocRef = adminDb.collection("userBets").doc(userEmail);
    const userDoc = await userDocRef.get();
    const bets = userDoc.exists ? userDoc.data()?.bets || [] : [];

    return (
        <div>
            <Header />
            <div className="min-h-screen pt-24 px-6 bg-gray-900 text-white">
                <h1 className="text-3xl font-bold mb-6">Your Saved Bets</h1>
                {bets.length === 0 ? (
                    <p className="text-gray-400">You haven’t saved any bets yet.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {bets.map((bet: SavedBet, index: number) => (
                            <BetCard key={index} bet={bet} index={index} />
                        ))}


                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}
