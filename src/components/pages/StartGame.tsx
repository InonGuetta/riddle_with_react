
import { useState } from "react";
import Navbar from "../Navbar";

import { riddles } from "../../data/fakeData";
import "../../style/startgame.css";

export default function StartGame() {

    const [realIndex, setIndex] = useState(0);
    const [userAnswer, setUserAnswer] = useState("");
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [finished, setFinished] = useState(false)
    
    const [startTime, setStartTime] = useState<number | null>(null);
    const [totalTime, setTotalTime] = useState(0);

    const goodAnswer = riddles[realIndex];

    const questionNow = () => {
        if (startTime === null){
            setStartTime(Date.now());
        }
        const currentTime = Date.now();
        const elapsedTime = currentTime - (startTime || currentTime);
        setTotalTime(totalTime + elapsedTime);
        if (userAnswer.toLowerCase().trim() === goodAnswer.correctAnswer.toLowerCase().trim()) {
            setIsCorrect(true)
            if (realIndex < riddles.length - 1) {
                setTimeout(() => {
                    setIndex(realIndex + 1);
                    setUserAnswer("");
                    setIsCorrect(null);
                    setStartTime(Date.now());
                }, 0)
            } else {
                setFinished(true)
            }
        } else {
            setIsCorrect(false)
        }
    };


    const avargeTime = totalTime / riddles.length;
    const avargeTimeSeconds = avargeTime/1000;



    return (
        <>
            <Navbar />
            <h1>welcome to the game</h1>
            <div>
                <h2>Question {realIndex + 1} of {riddles.length}</h2>
                <p>{goodAnswer.taskDescription}</p>
                <input
                    type="text"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder="Enter your answer"
                />
                <button onClick={questionNow}>Submit</button>
                {isCorrect === false && <p className="wrong_answer">Wrong answer, try again!</p>}
            </div>


            <div className={finished ? "finish" : "no_finish"}>
                <h1>Congratulations! You finished the game!</h1>
                <p className="the_time">Average response time: {avargeTimeSeconds.toFixed(2)} seconds </p>
            </div>

        </>
    );
}


