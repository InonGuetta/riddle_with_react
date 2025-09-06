import { Link } from "react-router-dom";
import "../style/navbar.css";

export default function Navbar() {
    return (
        <>
            <nav>
                <p >
                    <Link className="link" to="/">home</Link>
                </p>
                <p>
                    <Link className="link link_play" to="/startgame">PLAY</Link>
                </p>
                <p>
                    <Link className="link" to="/allriddle">manage riddle</Link>
                </p>
                <p>
                    <Link className="link" to="/sortplayer">table players</Link>
                </p>
            </nav>
        </>
    )
}