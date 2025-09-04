import Navbar from "../Navbar";
import { sortPlayersByTime } from "../../services/sortPlayers";
import type { Player } from "../../services/api.js";
import { useState, useEffect } from "react";
import styles from "../../style/sortedplayers.module.css";

export default function SortedPlayrs() {
    const [players, setPlayers] = useState<Player[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAndSortPlayers = async () => {
            try {
                setIsLoading(true);
                const sortedPlayers = await sortPlayersByTime();
                setPlayers(sortedPlayers);
                setError(null);
            } catch (error) {
                console.error('Error fetching players:', error);
                setError('Failed to load players');
            } finally {
                setIsLoading(false);
            }
        };

        fetchAndSortPlayers();
    }, []);

    if (isLoading) {
        return (
            <>
                <Navbar />
                <h1>Loading players...</h1>
            </>
        );
    }

    if (error) {
        return (
            <>
                <Navbar />
                <h1>Error: {error}</h1>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <h1 className={styles.leader}>
                The leader player is - {players[0]?.name || 'No players found'}
            </h1>
            <section className={styles.position_table}>
                <table>
                    <thead>
                        <tr className={styles.tr_head}>
                            <th className={styles.th_head}>ID</th>
                            <th className={styles.th_head}>Name</th>
                            <th className={styles.th_head}>Average Time (seconds)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {players.map(item => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.average_time_seconds.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {players.length === 0 && (
                    <p>No players found. Add some players first!</p>
                )}
            </section>
        </>
    );
}