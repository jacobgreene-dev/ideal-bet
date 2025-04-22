// index

import Header from "@/app/components/Header";
import Hero from "@/app/components/Hero";
import Body from "@/app/components/Body";
import Footer from "@/app/components/Footer";
import LiveGamesRow from "@/app/components/LiveGamesRow";
// import LiveGames from "@/app/components/LiveGames";
// import DisplayArticles from "@/app/components/DisplayArticles";



export default function App() {
    return (
        <div>
            <div className="my-3">
                <Header />
            </div>
            <Hero />
            <LiveGamesRow />
            <Body />
            <Footer />
        </div>
    );
} 