import Navbar from "../Navbar";
import { playerAPI } from "../../services/api.js";
import type { Player } from "../../services/api.js";
import { useState, useEffect } from "react";

export default function PlayersPage() {
    const [players, setPlayers] = useState<Player[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [newPlayer, setNewPlayer] = useState({
        id: 0,
        name: "",
        average_time_seconds: 0,
    });

    useEffect(() => {
        fetchPlayers();
    }, []);

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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewPlayer({
            ...newPlayer,
            [name]: name === 'id' || name === 'average_time_seconds' ? parseFloat(value) || 0 : value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await playerAPI.addPlayer(newPlayer);
            alert('Player added successfully!');
            setNewPlayer({ id: 0, name: "", average_time_seconds: 0 });
            fetchPlayers(); // Refresh the list
        } catch (error) {
            console.error('Error adding player:', error);
            alert('Failed to add player');
        }
    };

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
            <h1>Players Management</h1>
            
            {/* Add Player Form */}
            <section style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #ccc' }}>
                <h2>Add New Player</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>
                            Player ID:
                            <input
                                type="number"
                                name="id"
                                value={newPlayer.id}
                                onChange={handleInputChange}
                                required
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Name:
                            <input
                                type="text"
                                name="name"
                                value={newPlayer.name}
                                onChange={handleInputChange}
                                required
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Average Time (seconds):
                            <input
                                type="number"
                                step="0.1"
                                name="average_time_seconds"
                                value={newPlayer.average_time_seconds}
                                onChange={handleInputChange}
                                required
                            />
                        </label>
                    </div>
                    <button type="submit">Add Player</button>
                </form>
            </section>

            {/* Players List */}
            {/* <section>
                <h2>All Players ({players.length})</h2>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f5f5f5' }}>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>ID</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Name</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Average Time (seconds)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {players.map(player => (
                            <tr key={player.id}>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{player.id}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{player.name}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{player.average_time_seconds}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {players.length === 0 && (
                    <p>No players found. Add some players above!</p>
                )}
            </section> */}
        </>
    );
}
