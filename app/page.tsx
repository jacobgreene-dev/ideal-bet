//import Image from "next/image";
import Header from "./components/_Header";
import Hero from "./components/_Hero";
import Body from "./components/_Body";
import Footer from "./components/_Footer";
import LiveGames from "./components/_LiveGames";


export default function App() {
    return(
        <div>
            <Header />
            <Hero />
            <div className="h-12 bg-apple-500"></div>
            <LiveGames numberOfGames={8} />
            <Body />
            <Footer />
        </div>
    );
} 