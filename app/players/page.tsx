import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import PlayersPage from "@/app/components/Players";

export default function App() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <div className="flex-grow">
                <PlayersPage />
            </div>
            <Footer />
        </div>
    );
}