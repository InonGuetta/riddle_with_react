import { Link } from "react-router-dom";
import "../style/style.css";


export default function Navbar() {
    return (
        <>
        <nav>
            <Link to="/">home</Link>
            <Link to="/delete">delete</Link>
            <Link to="/startgame">to game</Link>
            <Link to="/insert">insert</Link>
            {/* <Link to="/finish"></Link> */}
            <Link to="/allriddle">all riddles</Link>
            <Link to="/sortplayer">table players</Link>
            <Link to="/update">Update riddles</Link>
        </nav>
        </>
    )
}