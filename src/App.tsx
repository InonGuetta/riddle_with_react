import './App.css'
import Navbar from './components/Navbar'


function App() {

  return (
    <>
      <Navbar />
      <section className="position_guide">
        <main className="design_guide">
          <h1 className="h1_guide">Welcome to the Riddle Game</h1>
          <h2>Game Objective</h2>
          <p>The goal of the game is to solve riddles as quickly and accurately as possible.
            Each player’s response time is measured, and the results are recorded to create a ranking compared to other participants.</p>
          <h2>How It Works</h2>
          <li>1 - A timer starts with each question.</li>
          <li>2 - Your time is measured until you submit an answer.</li>
          <li>3 - At the end of the game, your results are saved.</li>
          <li>4 - You are ranked on the leaderboard according to your performance</li>
          <h2>Navigation Within the Application</h2>
          <li>1 - Main Menu: Located at the top of the screen, it allows you to navigate to all sections of the game.</li>
          <li>2 - Riddle Log: View the entire collection of riddles. You can add new riddles, edit existing ones, or delete them</li>
          <li>3 - Leaderboard: Access the scoreboard to see the results of previous players and check your relative ranking.</li>
          <h2>Additional Features</h2>
          <li>1 - User-friendly interface with clear navigation.</li>
          <li>2 - Real-time performance tracking.</li>
          <li>3 - A dynamic ranking system to enhance competition.</li>
        </main>
      </section>
    </>
  )
}

export default App
