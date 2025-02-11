//import Image from "next/image";
import Header from "./components/_Header";
import Hero from "./components/_Hero";
import Body from "./components/_Body";
import Footer from "./components/_Footer";
import LiveGames from "./components/_LiveGames";
import DisplayArticles from "./components/_DisplayArticles";



export default function App() {
    return(
        <div>
            <Header />
            <Hero />
            <LiveGames numberOfGames={8} />
            <DisplayArticles />
            <Body />
            <Footer />
        </div>
    );
} 