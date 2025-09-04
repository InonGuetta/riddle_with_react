// Base URL for the server
const API_BASE_URL = 'http://localhost:3000';

// Types
export interface Riddle {
  _id?: string;
  name: string;
  taskDescription: string;
  correctAnswer: string;
}

export interface Player {
  id: number;
  name: string;
  average_time_seconds: number;
}

// Riddles API functions
export const riddleAPI = {
  // Get all riddles
  fetchRiddles: async (): Promise<Riddle[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/riddles`);
      if (!response.ok) throw new Error(`Server error: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching riddles:', error);
      throw error;
    }
  },

  // Add new riddle
  addRiddle: async (riddleData: Omit<Riddle, '_id'>): Promise<any> => {
    try {
      const response = await fetch(`${API_BASE_URL}/add-riddle`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(riddleData),
      });
      if (!response.ok) throw new Error(`Server error: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Error adding riddle:', error);
      throw error;
    }
  },

  // Delete riddle
  deleteRiddle: async (taskDescription: string): Promise<any> => {
    try {
      const response = await fetch(`${API_BASE_URL}/delete-riddle`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ taskDescription }),
      });
      if (!response.ok) throw new Error(`Server error: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Error deleting riddle:', error);
      throw error;
    }
  },

  // Update riddle
  updateRiddle: async (riddleData: Riddle): Promise<any> => {
    try {
      const response = await fetch(`${API_BASE_URL}/update-riddle`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(riddleData),
      });
      if (!response.ok) throw new Error(`Server error: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Error updating riddle:', error);
      throw error;
    }
  },
};

// Players API functions
export const playerAPI = {
  // Add player
  addPlayer: async (playerData: Player): Promise<any> => {
    try {
      const response = await fetch(`${API_BASE_URL}/players`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(playerData),
      });
      if (!response.ok) throw new Error(`Server error: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Error adding player:', error);
      throw error;
    }
  },

  // Get all players
  fetchPlayers: async (): Promise<Player[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/get`);
      if (!response.ok) throw new Error(`Server error: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching players:', error);
      throw error;
    }
  },
};
