import GameLoop from "./GameLoop.js";
import { useState, useEffect } from "react";

export default function Score() {
    const [highScore, setHighScore] = useState(0);
    const [score, setScore] = useState(0);

    useEffect(() => {
        const cleanup = GameLoop(({ score, highScore }) => {
            setScore(score);
            setHighScore(highScore);
        });
        return () => typeof cleanup === "function" && cleanup();
    }, []); // nur einmal starten!

    return (
        <div className={"Scores"}>
            <h2 id="highscore">Highscore: {highScore}</h2>
            <h2 id="score">Score: {score}</h2>
        </div>
    );
}
