"use client";

import { useState } from "react";
import TopBar from "@/components/TopBar";
import LandingScreen from "@/components/screens/LandingScreen";
import ChecklistScreen from "@/components/screens/ChecklistScreen";
import ResultScreen from "@/components/screens/ResultScreen";
import SolutionScreen from "@/components/screens/SolutionScreen";

export default function App() {
  const [screen, setScreen] = useState("landing"); // landing | checklist | result | solution
  const [answers, setAnswers] = useState({});
  const [qIndex, setQIndex] = useState(0);

  function restart() {
    setAnswers({});
    setQIndex(0);
    setScreen("landing");
  }

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans">
      <div className="max-w-4xl mx-auto border-x border-neutral-200 min-h-screen bg-white">
        <TopBar />
        {screen === "landing" && <LandingScreen onStart={() => setScreen("checklist")} />}
        {screen === "checklist" && (
          <ChecklistScreen
            answers={answers}
            setAnswers={setAnswers}
            index={qIndex}
            setIndex={setQIndex}
            onFinish={() => setScreen("result")}
          />
        )}
        {screen === "result" && (
          <ResultScreen
            answers={answers}
            onSeeSolutions={() => setScreen("solution")}
            onBack={() => setScreen("checklist")}
          />
        )}
        {screen === "solution" && (
          <SolutionScreen
            answers={answers}
            onRestart={restart}
            onBack={() => setScreen("result")}
          />
        )}
      </div>
    </div>
  );
}