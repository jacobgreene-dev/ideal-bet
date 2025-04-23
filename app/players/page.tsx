import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { PlayersPage } from "@/app/components/Players";
import { Suspense } from "react";

export default function App() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <div className="flex-grow">
                <Suspense fallback={<p className="text-white text-center p-8">Loading players...</p>}>
                    <PlayersPage />
                </Suspense>
            </div>
            <Footer />
        </div>
    );
}