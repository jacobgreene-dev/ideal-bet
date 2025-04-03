import React from "react";

export default function SBInfo() {
    return (
        <div>
            <div className="bg-cover bg-center min-h-screen flex flex-col items-center justify-center">
                <h1 className="text-4xl font-bold text-center text-white">Welcome to the Sports Book Information Component</h1>
                <div className="flex flex-col m-4 text-xl">
                    <h2><a href="/information/moneyline">Moneyline bets</a></h2>
                    <p><a href="/information/over-under">Over/Under bets</a></p>
                    <p><a href="/information/spread">Spread bets</a></p>
                </div>
            </div>

        </div>

    );
}