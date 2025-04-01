import Header from "@/app/components/_Header";
import Footer from "@/app/components/_Footer";

export default function App() {
    return (
        <div>
            <Header />
            <div className="bg-cover bg-center min-h-screen flex flex-col items-center justify-center">
                <h1 className="text-4xl font-bold text-center text-white">Welcome to the Betting information on over/under bets.</h1>
            </div>
            <Footer />
        </div>
    )
}