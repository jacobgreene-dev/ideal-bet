// index

import Header from "@/app/components/Header";
import Hero from "@/app/components/Hero";
import Body from "@/app/components/Body";
import Footer from "@/app/components/Footer";
import LiveGames from "@/app/components/LiveGames";
import DisplayArticles from "@/app/components/DisplayArticles";



export default function App() {
    return (
        <div>
            <div className="my-3">
                <Header />
            </div>
            <Hero />
            <LiveGames numberOfGames={9} />
            <DisplayArticles />
            <Body />
            <Footer />
        </div>
    );
} 