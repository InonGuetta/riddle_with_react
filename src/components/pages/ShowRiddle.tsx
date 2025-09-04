import Navbar from "../Navbar"
import { riddleAPI } from "../../services/api.js";
import type { Riddle } from "../../services/api.js";
import { useState, useEffect } from "react";
import styles from "../../style/showriddle.module.css";
import InsertRiddle from "./InsertRiddle.js";

export default function ShowRiddle() {
    const [riddles, setRiddles] = useState<Riddle[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string>("");
    const [toSure, setSure] = useState<boolean>(false)
    const [selectedTask, setSelectedTask] = useState<string>("");

    const fetchRiddles = async () => {
        try {
            setIsLoading(true);
            const riddlesData = await riddleAPI.fetchRiddles();
            setRiddles(riddlesData);
        } catch (error) {
            console.error('Error fetching riddles:', error);
            setError('Failed to load riddles');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (taskDescription: string) => {
        try {
            await riddleAPI.deleteRiddle(taskDescription); 
            setRiddles((prevRiddles) => prevRiddles.filter((riddle) => riddle.taskDescription !== taskDescription)); 
        } catch (error) {
            console.error('Error deleting riddle:', error);
            alert('Failed to delete riddle. Please try again.');
        }
    };

    useEffect(() => {
        fetchRiddles();
    }, []);


    if (isLoading) {
        return (
            <>
                <Navbar />
                <h1 className={styles.title_riddles}>Loading riddles...</h1>
            </>
        );
    }
    if (error) {
        return (
            <>
                <Navbar />
                <h1 className={styles.title_riddles}>Error: {error}</h1>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <button className="to_navigate_insert" onClick={() => document.getElementById('to_go_insert_riddle')?.scrollIntoView({ behavior: 'smooth' })}>Insert Riddle</button>
            <h1 className={styles.title_riddles}>All Riddles - {riddles.length}</h1>
            <section className="design_page">
                <section className={styles.position_table}>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Task Description</th>
                                <th>Correct Answer</th>
                                <th className="design_title_delete">DELETE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {riddles.map(item => (
                                <tr key={item._id}>
                                    <td>{item._id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.taskDescription}</td>
                                    <td>{item.correctAnswer}</td>
                                    <td onClick={() => { setSelectedTask(item.taskDescription ?? null); setSure(true); }}>X</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {toSure && (
                      <section className={toSure ? "toSure_display" : "toSure_display_non"}>
                        <p>Are you sure you want to delete: "{selectedTask}"?</p>


                        <button
                          onClick={async () => {
                            if (!selectedTask) return;
                            await handleDelete(selectedTask);
                            setSure(false);
                            setSelectedTask("");
                          }}
                        >
                          Yes
                        </button>
                        <button onClick={() => { setSure(false); setSelectedTask(""); }}>
                          No
                        </button>
                      </section>
                    )}
                    <section id="to_go_insert_riddle" className={styles.form_container}>
                        <InsertRiddle onRiddleInserted={fetchRiddles} />
                    </section>
                </section>

            </section>

        </>
    )
}