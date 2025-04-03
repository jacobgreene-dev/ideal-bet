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

export default function MoneylineBetting() {
  const [team1, setTeam1] = useState("");
  const [team2, setTeam2] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");
  const [betAmount, setBetAmount] = useState(100);
  const [odds, setOdds] = useState("");
  const [result, setResult] = useState<string | null>(null);

  const inputStyle =
    "border-[2px] text-black border-silver rounded-lg outline-[#000000] p-2 focus:border-[#000000] ease-linear duration-200 ";

  const handleChange = (evt: ChangeEvent<HTMLSelectElement | HTMLInputElement>): void => {
    const { name, value } = evt.target;
    if (name === "team1") setTeam1(value);
    if (name === "team2") setTeam2(value);
    if (name === "selectedTeam") setSelectedTeam(value);
    if (name === "betAmount") setBetAmount(parseFloat(value));
    if (name === "odds") setOdds(value);
  };

  const calculateMoneylineBet = () => {
    if (!team1 || !team2 || !selectedTeam || !odds) {
      alert("Please select both teams, your bet team, and enter the odds.");
      return;
    }

    const impliedProbability = odds.startsWith("-")
      ? Math.abs(parseInt(odds)) / (Math.abs(parseInt(odds)) + 100)
      : 100 / (parseInt(odds) + 100);

    const potentialReturn = odds.startsWith("-")
      ? (betAmount / Math.abs(parseInt(odds))) * 100
      : (betAmount * parseInt(odds)) / 100;

    const winningTeam = Math.random() < 0.5 ? team1 : team2;
    const wonBet = winningTeam === selectedTeam;
    const winnings = wonBet ? potentialReturn.toFixed(2) : "0.00";

    setResult(`
      <p class='mt-2 max-w-2xl mx-auto text-black'><strong>Teams:</strong> ${team1} vs ${team2}</p>
      <p class='mt-2 max-w-2xl mx-auto text-black'><strong>Your Bet:</strong> ${selectedTeam} (Odds: ${odds})</p>
      <p class='mt-2 max-w-2xl mx-auto text-black'><strong>Bet Amount:</strong> $${betAmount}</p>
      <p class='mt-2 max-w-2xl mx-auto text-black'><strong>Winning Team:</strong> ${winningTeam}</p>
      <p class='mt-2 max-w-2xl mx-auto text-black'><strong>Potential Return:</strong> $${winnings}</p>
    `);
  };

  return (
    <div>
      <Header />
      <div className="flex justify-center w-full h-screen">
        <div className="flex flex-col absolute top-[30%] bg-white shadow-lg border-silver border-[2px] rounded-lg p-5 w-[40%] mobile:w-[90%]">
          <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Moneyline Betting</h1>

          {/* Team Selection */}
          <select className={`${inputStyle} mt-2`} name="team1" value={team1} onChange={handleChange}>
            <option value="">Select Home Team</option>
            {teams.map(team => <option key={team} value={team}>{team}</option>)}
          </select>
          <select className={`${inputStyle} mt-2`} name="team2" value={team2} onChange={handleChange}>
            <option value="">Select Away Team</option>
            {teams.map(team => <option key={team} value={team}>{team}</option>)}
          </select>

          {/* Betting Team Selection */}
          <select className={`${inputStyle} mt-2`} name="selectedTeam" value={selectedTeam} onChange={handleChange}>
            <option value="">Select Your Bet</option>
            <option value={team1}>{team1}</option>
            <option value={team2}>{team2}</option>
          </select>

          {/* Odds Input */}
          <input className={`${inputStyle} mt-2`} name="odds" type="text" value={odds} onChange={handleChange} placeholder="Enter odds (e.g., -150, +200)" />

          {/* Bet Amount */}
          <input className={`${inputStyle} mt-2`} name="betAmount" type="number" value={betAmount} min={1} onChange={handleChange} />

          <button className="mt-5 flex justify-center bg-sky-500 text-white font-medium rounded-md p-2 border-[2px] border-transparent hover:bg-white hover:text-sky-500 hover:border-sky-500 hover:shadow-md ease-linear duration-200" onClick={calculateMoneylineBet}>
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