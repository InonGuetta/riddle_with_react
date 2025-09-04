import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import DeleteRiddle from './components/pages/DeleteRiddle.tsx';
import InsertRiddle from './components/pages/InsertRiddle.tsx';
import PageFinishPlayers from './components/pages/PageFinishPlayers.tsx';
import ShowRiddle from './components/pages/ShowRiddle.tsx';
import SortedPlayrs from './components/pages/SortedPlayers.tsx';
import StartGame from './components/pages/StartGame.tsx';
import UpdateRiddle from './components/pages/UpdateRiddle.tsx';
import PlayersPage from './components/pages/PlayersPage.tsx';
import { BrowserRouter, Route, Routes} from 'react-router';


createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<App/>}/>
      <Route path='/startgame' element={<StartGame/>}/>
      <Route path='/delete' element={<DeleteRiddle/>}/>
      <Route path='/finish' element={<PageFinishPlayers/>}/>
      <Route path='/allriddle' element={<ShowRiddle/>}/>
      <Route path='/sortplayer' element={<SortedPlayrs/>}/>
      <Route path='/players' element={<PlayersPage/>}/>
      <Route path='/update' element={<UpdateRiddle/>}/>
    </Routes>
    </BrowserRouter>
)
