import { riddleAPI } from "../../services/api.js";
import { useState } from "react";
import "../../style/insertriddle.css";

export default function InsertRiddle({ onRiddleInserted }: { onRiddleInserted?: () => void }) {
    const [newRiddle, setNewRiddle] = useState({
        name: "",
        taskDescription: "",
        correctAnswer: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewRiddle({ ...newRiddle, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await riddleAPI.addRiddle(newRiddle);
            setNewRiddle({ name: "", taskDescription: "", correctAnswer: "" });
            if (onRiddleInserted) {
                onRiddleInserted();
            }
        } catch (error) {
            console.error("Error adding riddle:", error);
            alert("Failed to add riddle. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <h1 className="title_insert_riddle">Insert a New Riddle</h1>
            <section className="design_insert_riddle">
                <form onSubmit={handleSubmit}>
                    <label className="label_insert">
                        type riddle:
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={newRiddle.name}
                            onChange={handleChange}
                            required
                        />
                    <label className="label_insert">
                        Task Description:
                        </label>
                        <input
                            type="text"
                            name="taskDescription"
                            value={newRiddle.taskDescription}
                            onChange={handleChange}
                            required
                        />
                    <label className="label_insert">
                        Correct Answer:
                        </label>
                        <input
                            type="text"
                            name="correctAnswer"
                            value={newRiddle.correctAnswer}
                            onChange={handleChange}
                            required
                        />
                    <button className="submit_insert_riddle" type="submit" disabled={isLoading}>
                        {isLoading ? 'Adding Riddle...' : 'Add Riddle'}
                    </button>
                </form >
            </section>
        </>
    )
}