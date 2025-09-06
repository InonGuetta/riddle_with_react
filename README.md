Riddle Game – React + Node.js

Author: Inon Guetta
GitHub: https://github.com/InonGuetta

Short Description

A full-stack Riddle Game Application.
Frontend: React + Vite + TypeScript
Backend: Node.js/Express
Databases:
Riddles are managed in MongoDB
Players and leaderboard data are stored in PostgreSQL via Sequelize
The app enables riddle management, gameplay with average response time tracking, and a leaderboard sorted by fastest players.

Application Features
Full navigation: Home, Start Game, Riddle Management, Player Leaderboard.
Riddle Management (MongoDB):
Get all riddles (GET /riddles)
Add a riddle (POST /add-riddle)
Delete a riddle by task description (DELETE /delete-riddle)

Gameplay:

Load all riddles from the server, display them one by one, validate answers (case-insensitive)
Measure total time and calculate average response time
At the end of the game, create a new player record in PostgreSQL with the field average_time_seconds
Leaderboard (PostgreSQL):
Retrieve all players (GET /get)
Sort client-side by average time (fastest → slowest)
Basic error handling with loading/error/no-data messages
Prerequisites
Node.js 18+ and npm
Accessible MongoDB (cloud/local) for riddles database (riddles_db, collection: riddles)
Accessible PostgreSQL (recommended: Neon) with SSL support for players table
Default ports: Backend 3000, Frontend 5173
Environment variables (server/.env):

URL_MONGO=mongodb://<user>:<pass>@<host>:<port>/<db>
NEON_URI=postgres://<user>:<pass>@<host>/<db>?sslmode=require
PORT=3000


Notes:
PostgreSQL config: server/config/db.config.js uses SSL and expects NEON_URI.
MongoDB config: server/config/mongo.config.js expects URL_MONGO and connects to riddles_db.
Setup Instructions (Windows cmd)
Install dependencies for root + client + server:
npm run install:all


Or separately:

npm install
npm run install:client
npm run install:server


Create server environment file and add credentials:

cd server
echo URL_MONGO=your_mongodb_connection_string>> .env
echo NEON_URI=your_postgres_connection_string>> .env
echo PORT=3000>> .env
cd ..


Run the backend (first terminal):
npm run dev:server

Server runs at: http://localhost:3000
Run the frontend (second terminal):
npm run dev:client


Frontend runs at: http://localhost:5173

👉 If you change server port/domain, update API_BASE_URL in client/src/services/api.ts.

Folder Structure
riddle_react/
├─ client/                      
│  ├─ src/
│  │  ├─ main.tsx               
│  │  ├─ App.tsx                
│  │  ├─ components/
│  │  │  ├─ Navbar.tsx          
│  │  │  └─ pages/
│  │  │     ├─ StartGame.tsx    
│  │  │     ├─ ShowRiddle.tsx   
│  │  │     ├─ InsertRiddle.tsx 
│  │  │     └─ SortedPlayers.tsx   
│  │  ├─ services/
│  │  │  ├─ api.ts              
│  │  │  └─ sortPlayers.tsx     
│  │  └─ style/                  
│  └─ vite.config.ts             
│
├─ server/                      
│  ├─ server.js                  
│  ├─ routes/
│  │  ├─ configRoutes.js        
│  │  ├─ riddles.routes.js      
│  │  └─ players.routes.js      
│  ├─ controllers/
│  │  └─ riddles.controllers.js 
│  ├─ DAL/
│  │  └─ riddels.js             
│  ├─ models/
│  │  └─ player.model.js        
│  └─ config/
│     ├─ db.config.js           
│     └─ mongo.config.js        
└─ package.json                  

Example Usage

Scenario:
Start the game → Riddles are fetched from MongoDB.
User answers each one → Answers validated (case-insensitive).
Timer tracks total and average response time.
At the end → A new player record is saved into PostgreSQL.
Future Development Ideas
Add validation & schema checks (both client and server)
Save per-riddle response times (not just average) and provide charts/analytics
User authentication & role-based permissions (admin, player)
Add game modes (timed challenge, difficulty levels)
Full leaderboard with filters and pagination
