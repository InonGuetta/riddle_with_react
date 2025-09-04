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
                    <Link className="link" to="/startgame">to game</Link>
                </p>
                <p>
                    <Link className="link" to="/delete">delete</Link>
                </p>
                <p>
                    <Link className="link" to="/allriddle">manage riddle</Link>
                </p>
                <p>
                    <Link className="link" to="/sortplayer">table players</Link>
                </p>
                <p>
                    <Link className="link" to="/players">manage players</Link>
                </p>
                <p>
                    <Link className="link" to="/update">update riddles</Link>
                </p>
            </nav>
        </>
    )
}