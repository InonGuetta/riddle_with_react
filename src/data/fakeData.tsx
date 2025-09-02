// מחקה מבנה אחיד כמו של dto 
// למרות שdata noSql לא צריכה להיות בעלת מבנה שדות אחיד בשונה מ sql טבלאי רגיל 
type Task = {
    _id: string;
    name: string;
    taskDescription: string;
    correctAnswer: string;
};

export const riddles: Task[] = [
    {
        _id: "67c5b6f7-3c3e-4b72-845b-11a5b7e07d2f",
        name: "math",
        taskDescription: "2 + 2",
        correctAnswer: "4",
    },
    {
        _id: "a8d9e0f1-4b5a-4c6d-8e7f-2g8h9i0j1k2l",
        name: "history",
        taskDescription: "What is the capital of France??",
        correctAnswer: "paris",
    },
    {
        _id: "b3f2a1c9-8e7d-6f5a-4b3c-2a1b0c9d8e7f",
        name: "scince",
        taskDescription: "What is the largest planet in the solar system ?",
        correctAnswer: "Jupiter",
    },
];


type Player = {
    id: number;
    name: string;
    time: number;
};

export const players: Player[] = [
    { id: 1, name: "inon", time: 2.1},
    { id: 2, name: "david", time: 2.4},
    { id: 3, name: "shimon", time: 2.7},
    { id: 4, name: "yigal", time: 1.4},
    { id: 5, name: "tomer", time: 3.2},
    { id: 6, name: "yaron", time: 0.7}
]

