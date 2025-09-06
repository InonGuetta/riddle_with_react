import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import ShowRiddle from './components/pages/ShowRiddle.tsx';
import SortedPlayrs from './components/pages/SortedPlayers.tsx';
import StartGame from './components/pages/StartGame.tsx';
import { BrowserRouter, Route, Routes} from 'react-router';


createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<App/>}/>
      <Route path='/startgame' element={<StartGame/>}/>
      <Route path='/allriddle' element={<ShowRiddle/>}/>
      <Route path='/sortplayer' element={<SortedPlayrs/>}/>
    </Routes>
    </BrowserRouter>
)
