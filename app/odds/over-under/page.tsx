"use client";

import React, { useState, ChangeEvent } from "react";
import Header from "@/app/components/_header";
import Footer from "@/app/components/_footer";


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
  const [overUnderTotal, setOverUnderTotal] = useState(220);
  const [overUnderChoice, setOverUnderChoice] = useState("");
  const [betAmount, setBetAmount] = useState(100);
  const [result, setResult] = useState<string | null>(null);

  const inputStyle =
    "border-[2px] text-black border-silver rounded-lg outline-[#000000] p-2 focus:border-[#000000] ease-linear duration-200 ";

  const handleChange = (evt: ChangeEvent<HTMLSelectElement | HTMLInputElement>): void => {
    const { name, value } = evt.target;
    if (name === "team1") setTeam1(value);
    if (name === "team2") setTeam2(value);
    if (name === "overUnderTotal") setOverUnderTotal(parseFloat(value));
    if (name === "overUnderChoice") setOverUnderChoice(value);
    if (name === "betAmount") setBetAmount(parseFloat(value));
  };

  const calculateBet = () => {
    if (!team1 || !team2 || !overUnderChoice) {
      alert("Please select both teams and the team you want to bet on");
      return;
    }
  
    const team1Score = Math.floor(Math.random() * 120);
    const team2Score = Math.floor(Math.random() * 120);
    const totalScore = team1Score + team2Score;
    const oddsMultiplier = 1.91;
    const potentialPayout = betAmount * oddsMultiplier;
    const wonBet =
    (overUnderChoice === "Over" && totalScore > overUnderTotal) ||
    (overUnderChoice === "Under" && totalScore < overUnderTotal);
    const winnings = wonBet ? potentialPayout.toFixed(2) : "0.00";
  
    setResult(`
      <p class="mt-2 max-w-2xl mx-auto text-black"><strong>Teams:</strong> ${team1} vs ${team2}</p>
      <p class="mt-2 max-w-2xl mx-auto text-black"><strong>Your Bet:</strong> ${overUnderChoice} ${overUnderTotal}</p>
      <p class="mt-2 max-w-2xl mx-auto text-black"><strong>Bet Amount:</strong> $${betAmount}</p>
      <p class="mt-2 max-w-2xl mx-auto text-black"><strong>Estimated Win Probability:</strong> ${team1Score} - ${team2Score} (Total: ${totalScore})%</p>
      <p class="mt-2 max-w-2xl mx-auto text-black"><strong>Potential Return:</strong> $${winnings}</p>
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

        {/* Over/Under Total */}
        <input className={`${inputStyle} mt-2`} name="overUnderTotal" type="number" value={overUnderTotal} step={0.5} onChange={handleChange}
        />
          {/* Bet Selection */}
          <select className={`${inputStyle} mt-2`} name="overUnderChoice" value={overUnderChoice} onChange={handleChange}>
            <option value="">Select Over/Under</option>
            <option value="Over">Over</option>
            <option value="Under">Under</option>
            </select>

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