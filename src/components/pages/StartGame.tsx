import { useState, useEffect } from "react";
import Navbar from "../Navbar";
import { playerAPI, riddleAPI } from "../../services/api.js";
import type { Player, Riddle } from "../../services/api.js";
import "../../style/startgame.css";

export default function StartGame() {
    const [riddles, setRiddles] = useState<Riddle[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [realIndex, setIndex] = useState(0);
    const [userAnswer, setUserAnswer] = useState("");
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [finished, setFinished] = useState(false)

    const [startTime, setStartTime] = useState<number | null>(null);
    const [totalTime, setTotalTime] = useState(0);

    const [players, setPlayers] = useState<Player[]>([]);
    const [newPlayer, setNewPlayer] = useState({
        id: 0,
        name: "",
        average_time_seconds: 0,
    });

    const savePlayerToDB = async () => {
        try {
            const playerData = {
                id: players.length + 1,
                name: newPlayer.name,
                average_time_seconds: avargeTime,
            };
            await playerAPI.addPlayer(playerData);
            console.log("Player data saved successfully:", playerData);
        } catch (error) {
            console.error("Error saving player data:", error);
        }
    };

    useEffect(() => {
        fetchPlayers();
        if (finished) {
            savePlayerToDB();
        }
    }, [finished]);

    const fetchPlayers = async () => {
        try {
            setIsLoading(true);
            const playersData = await playerAPI.fetchPlayers();
            setPlayers(playersData);
        } catch (error) {
            console.error('Error fetching players:', error);
            setError('Failed to load players');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const fetchRiddles = async () => {
            try {
                setIsLoading(true);
                const riddlesData = await riddleAPI.fetchRiddles();
                setRiddles(riddlesData);
                setError(null);
            } catch (error) {
                console.error('Error fetching riddles:', error);
                setError('Failed to load riddles');
            } finally {
                setIsLoading(false);
            }
        };
        fetchRiddles();
    }, []);

    if (isLoading) {
        return (
            <>
                <Navbar />
                <h1>Loading riddles...</h1>
            </>
        );
    }

    if (error) {
        return (
            <>
                <Navbar />
                <h1>Error: {error}</h1>
                <p>Please make sure the server is running and try again.</p>
            </>
        );
    }

    if (riddles.length === 0) {
        return (
            <>
                <Navbar />
                <h1>No riddles found</h1>
                <p>Please add some riddles first!</p>
            </>
        );
    }

    const goodAnswer = riddles[realIndex];

    const questionNow = () => {
        if (startTime === null) {
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

    const avargeTime = (totalTime / riddles.length) / 1000;
    return (
        <>
            <Navbar />
            <h1>welcome to the game</h1>
            <div>
                <h2>Question {realIndex + 1} of {riddles.length}</h2>

                <label >your name
                    <input
                        id="the_name_player_this_round"
                        type="text"
                        value={newPlayer.name}
                        onChange={(e) => setNewPlayer({...newPlayer, name: e.target.value})}
                        required />
                </label>


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
                <p >Player ID: {players.length + 1}</p>
                <p >Player Name: {(document.getElementById('the_name_player_this_round') as HTMLInputElement)?.value || newPlayer.name}</p>
                <p className="the_time">Average response time: {avargeTime.toFixed(2)} seconds </p>
            </div>
        </>
    );
}


