import { players } from "../data/fakeData";

export const sortPlayer = players.sort((a,b) => a.time - b.time);