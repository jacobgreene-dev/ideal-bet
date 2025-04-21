"use client";

import React, { useState, ChangeEvent } from "react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import LoadingSpinner from "@/app/components/LoadingSpinner";

const players = [
  "LeBron James",
  "Stephen Curry",
  "Kevin Durant",
  "Giannis Antetokounmpo",
  "Nikola Jokic",
  "Luka Doncic",
  "Joel Embiid",
  "Jayson Tatum",
  "Ja Morant",
  "Devin Booker"
];

const statCategories = [
  "Points",
  "Rebounds",
  "Assists",
  "Steals",
  "Blocks",
  "Three Pointers Made",
  "Field Goal Percentage",
  "Free Throw Percentage"
];

export default function FantasyBetting() {
  const [selectedPlayer, setSelectedPlayer] = useState("");
  const [selectedStat, setSelectedStat] = useState("");
  const [statValue, setStatValue] = useState("");
  const [betAmount, setBetAmount] = useState(100);
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const inputStyle =
    "border-[2px] text-black border-silver rounded-lg outline-[#000000] p-2 focus:border-[#000000] ease-linear duration-200 ";

  const handleChange = (evt: ChangeEvent<HTMLSelectElement | HTMLInputElement>): void => {
    const { name, value } = evt.target;
    if (name === "player") setSelectedPlayer(value);
    if (name === "stat") setSelectedStat(value);
    if (name === "statValue") setStatValue(value);
    if (name === "betAmount") setBetAmount(parseFloat(value));
  };

  const calculateBet = async () => {
    if (!selectedPlayer || !selectedStat || !statValue) {
      alert("Please select a player, stat category, and enter the stat value.");
      return;
    }

    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Generate random performance based on the stat category
    let actualValue = 0;
    let wonBet = false;

    switch (selectedStat) {
      case "Points":
        actualValue = Math.floor(Math.random() * 50);
        wonBet = actualValue >= parseFloat(statValue);
        break;
      case "Rebounds":
        actualValue = Math.floor(Math.random() * 20);
        wonBet = actualValue >= parseFloat(statValue);
        break;
      case "Assists":
        actualValue = Math.floor(Math.random() * 15);
        wonBet = actualValue >= parseFloat(statValue);
        break;
      case "Steals":
        actualValue = Math.floor(Math.random() * 5);
        wonBet = actualValue >= parseFloat(statValue);
        break;
      case "Blocks":
        actualValue = Math.floor(Math.random() * 5);
        wonBet = actualValue >= parseFloat(statValue);
        break;
      case "Three Pointers Made":
        actualValue = Math.floor(Math.random() * 10);
        wonBet = actualValue >= parseFloat(statValue);
        break;
      case "Field Goal Percentage":
        actualValue = Math.floor(Math.random() * 100);
        wonBet = actualValue >= parseFloat(statValue);
        break;
      case "Free Throw Percentage":
        actualValue = Math.floor(Math.random() * 100);
        wonBet = actualValue >= parseFloat(statValue);
        break;
    }

    const oddsMultiplier = 1.91;
    const potentialPayout = betAmount * oddsMultiplier;
    const winnings = wonBet ? potentialPayout.toFixed(2) : "0.00";

    setResult(`
      <p class="mt-2 max-w-2xl mx-auto text-black"><strong>Player:</strong> ${selectedPlayer}</p>
      <p class="mt-2 max-w-2xl mx-auto text-black"><strong>Stat Category:</strong> ${selectedStat}</p>
      <p class="mt-2 max-w-2xl mx-auto text-black"><strong>Your Bet:</strong> ${statValue}</p>
      <p class="mt-2 max-w-2xl mx-auto text-black"><strong>Actual Performance:</strong> ${actualValue}</p>
      <p class="mt-2 max-w-2xl mx-auto text-black"><strong>Bet Amount:</strong> $${betAmount}</p>
      <p class="mt-2 max-w-2xl mx-auto text-black"><strong>Result:</strong> ${wonBet ? "Won" : "Lost"}</p>
      <p class="mt-2 max-w-2xl mx-auto text-black"><strong>Potential Return:</strong> $${winnings}</p>
    `);
    
    setIsLoading(false);
  };

  return (
    <div>
      <Header />
      <div className="flex justify-center w-full h-screen">
        <div className="flex flex-col absolute top-[30%] bg-white shadow-lg border-silver border-[2px] rounded-lg p-5 w-[40%] mobile:w-[90%]">
          <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Fantasy Player Betting</h1>

          {/* Player Selection */}
          <select className={`${inputStyle} mt-2`} name="player" value={selectedPlayer} onChange={handleChange}>
            <option value="">Select Player</option>
            {players.map(player => (
              <option key={player} value={player}>{player}</option>
            ))}
          </select>

          {/* Stat Category Selection */}
          <select className={`${inputStyle} mt-2`} name="stat" value={selectedStat} onChange={handleChange}>
            <option value="">Select Stat Category</option>
            {statCategories.map(stat => (
              <option key={stat} value={stat}>{stat}</option>
            ))}
          </select>

          {/* Stat Value Input */}
          <input 
            className={`${inputStyle} mt-2`} 
            name="statValue" 
            type="number" 
            value={statValue} 
            onChange={handleChange}
            placeholder={`Enter ${selectedStat} value`}
          />

          {/* Bet Amount */}
          <input 
            className={`${inputStyle} mt-2`} 
            name="betAmount" 
            type="number" 
            value={betAmount} 
            min={1} 
            onChange={handleChange} 
          />

          <button 
            className="mt-5 flex justify-center bg-sky-500 text-white font-medium rounded-md p-2 border-[2px] border-transparent hover:bg-white hover:text-sky-500 hover:border-sky-500 hover:shadow-md ease-linear duration-200 disabled:opacity-50 disabled:cursor-not-allowed" 
            onClick={calculateBet}
            disabled={isLoading}
          >
            {isLoading ? <LoadingSpinner size="sm" /> : "Calculate Bet"}
          </button>

          {result && (
            <div className="result mt-4" dangerouslySetInnerHTML={{ __html: result }}></div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
} 