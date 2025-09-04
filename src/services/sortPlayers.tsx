import { playerAPI } from "./api.js";
import type { Player } from "./api.js";

export const sortPlayersByTime = async (): Promise<Player[]> => {
    try {
        const players = await playerAPI.fetchPlayers();
        return players.sort((a, b) => a.average_time_seconds - b.average_time_seconds);
    } catch (error) {
        console.error('Error fetching and sorting players:', error);
        return [];
    }
};