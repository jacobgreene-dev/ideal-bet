//import Image from "next/image";
import Header from "./components/_header";
import Hero from "./components/_hero";
import Body from "./components/_Body";
import Footer from "./components/_footer";
import LiveGames from "./components/_LiveGames";
import DisplayArticles from "./components/_DisplayArticles";



export default function App() {
    return(
        <div>
            <Header />
            <Hero />
            <LiveGames numberOfGames={9} />
            <DisplayArticles />
            <Body />
            <Footer />
        </div>
    );
} 