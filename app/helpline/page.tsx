import Header from "../components/_Header";
import Footer from "../components/_Footer";
import GamblingHelpline from "../components/_GamblingHelpline";

export default function App() {
    return (
        <div>
            <Header />
            <GamblingHelpline/>

            <div className="text-center mt-6 px-4">
    <h1 className="text-3xl font-semibold mb-4">Problem Gambling Helpline</h1>
    <p className="font-bold max-w-2xl mx-auto">
        We are committed to responsible gambling. If you or someone you 
        know is struggling with gambling, help is available. Please call 
        <a href="tel:1-800-662-4357" className="text-red-600 underline font-bold"> 1-800-662-HELP (4357) </a> 
        or use the resources below to stay in control.
    </p>
</div>



            <div className="mt-6 px-4 text-center pb-12">
                <div className="mt-6 px-4 text-center">
                    <h2 className="text-2xl font-semibold">Set Limits or Self-Exclude</h2>
                    <p className="mt-2 max-w-2xl mx-auto">
                        If you need a break, consider setting limits on your deposits, time spent, or self-exclude
                        from betting for a period of time.
                    </p>
                </div>

                <div className="mt-6 px-4">
                    <h2 className="text-2xl font-semibold text-center">Responsible Gambling Tips</h2>
                    <ul className="list-disc list-inside mt-4 max-w-2xl mx-auto space-y-2">
                        <li>Set a budget and stick to it.</li>
                        <li>Never chase your losses.</li>
                        <li>Take regular breaks from gambling.</li>
                        <li>Only gamble for entertainment, not as a source of income.</li>
                        <li>Know the risks and play responsibly.</li>
                    </ul>
                </div>

                <h2 className="text-2xl font-semibold mt-4">Resources</h2>
                <div className="mt-2 space-y-2">
                    <p>
                        <a href="https://www.ncpgambling.org/help-treatment/problem-gambling-self-assessment/"
                            className="text-blue-600 underline hover:text-blue-800">
                            Problem Gambling Self Assessment
                        </a>
                    </p>
                    <p>
                        <a href="https://www.ncpgambling.org/help-treatment/help-by-state/"
                            className="text-blue-600 underline hover:text-blue-800">
                            Help by State
                        </a>
                    </p>
                    <p>
                        <a href="https://www.samhsa.gov/find-help/helplines/national-helpline"
                            className="text-blue-600 underline hover:text-blue-800">
                            SAMHSA’s National Helpline
                        </a>
                    </p>
                    <p>
                        <a href="https://www.horizonbh.org/gambling"
                            className="text-blue-600 underline hover:text-blue-800">
                            Problem Gambling Prevention
                        </a>
                    </p>
                </div>
            </div>

            <Footer />
        </div>
    );
}
