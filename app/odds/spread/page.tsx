"use client";

import React, { useState, ChangeEvent } from "react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";


const teams = [
  "Los Angeles Lakers",
  "Boston Celtics",
  "Golden State Warriors",
  "Brooklyn Nets",
  "Milwaukee Bucks"
];

export default function SpreadBetting() {
  const [team1, setTeam1] = useState("");
  const [team2, setTeam2] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");
  const [spread, setSpread] = useState(-5.5);
  const [betAmount, setBetAmount] = useState(100);
  const [result, setResult] = useState<string | null>(null);

  const inputStyle =
    "border-[2px] text-black border-silver rounded-lg outline-[#000000] p-2 focus:border-[#000000] ease-linear duration-200 ";

  const handleChange = (evt: ChangeEvent<HTMLSelectElement | HTMLInputElement>): void => {
    const { name, value } = evt.target;
    if (name === "team1") setTeam1(value);
    if (name === "team2") setTeam2(value);
    if (name === "selectedTeam") setSelectedTeam(value);
    if (name === "spread") setSpread(parseFloat(value));
    if (name === "betAmount") setBetAmount(parseFloat(value));
  };

  const calculateBet = () => {
    if (!team1 || !team2 || !selectedTeam) {
      alert("Please select both teams and the team you want to bet on");
      return;
    }
  
    const randomProbability = Math.random();
    const winProbability = selectedTeam === team1 ? randomProbability : 1 - randomProbability;
    const potentialReturn = betAmount * (1 + winProbability);
  
    setResult(`
      <p class="mt-2 max-w-2xl mx-auto text-black"><strong>Teams:</strong> ${team1} vs ${team2}</p>
      <p class="mt-2 max-w-2xl mx-auto text-black"><strong>Your Bet:</strong> ${selectedTeam} ${spread > 0 ? "+" : ""}${spread}</p>
      <p class="mt-2 max-w-2xl mx-auto text-black"><strong>Bet Amount:</strong> $${betAmount}</p>
      <p class="mt-2 max-w-2xl mx-auto text-black"><strong>Estimated Win Probability:</strong> ${(winProbability * 100).toFixed(1)}%</p>
      <p class="mt-2 max-w-2xl mx-auto text-black"><strong>Potential Return:</strong> $${potentialReturn.toFixed(2)}</p>
    `);
  };

  return (
    <div>
      <Header />
      <div className="flex justify-center w-full h-screen">
        <div className="flex flex-col absolute top-[30%] bg-white shadow-lg border-silver border-[2px] rounded-lg p-5 w-[40%] mobile:w-[90%]">
          <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Point Spread Betting</h1>

          {/* Team Selection */}
          <select className={`${inputStyle} mt-2`} name="team1" value={team1} onChange={handleChange}>
            <option value="">Select Home Team</option>
            {teams.map(team => <option key={team} value={team}>{team}</option>)}
          </select>
          <select className={`${inputStyle} mt-2`} name="team2" value={team2} onChange={handleChange}>
            <option value="">Select Away Team</option>
            {teams.map(team => <option key={team} value={team}>{team}</option>)}
          </select>

          {/* Bet Selection */}
          <select className={`${inputStyle} mt-2`} name="selectedTeam" value={selectedTeam} onChange={handleChange}>
            <option value="">Select Team to Bet On</option>
            {[team1, team2].filter(Boolean).map(team => (
              <option key={team} value={team}>{team}</option>
            ))}
          </select>

          {/* Point Spread */}
          <input className={`${inputStyle} mt-2`} name="spread" type="number" value={spread} step={0.5} onChange={handleChange} />

          {/* Bet Amount */}
          <input className={`${inputStyle} mt-2`} name="betAmount" type="number" value={betAmount} min={1} onChange={handleChange} />

          <button className="mt-5 flex justify-center bg-sky-500 text-white font-medium rounded-md p-2 border-[2px] border-transparent hover:bg-white hover:text-sky-500 hover:border-sky-500 hover:shadow-md ease-linear duration-200" onClick={calculateBet}>
            Calculate Bet
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