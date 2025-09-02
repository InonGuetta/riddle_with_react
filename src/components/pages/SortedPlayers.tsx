import Navbar from "../Navbar";
import { sortPlayer } from "../../services/sortPlayers";
import "../../style/sorteplayer.css";


export default function SortedPlayrs() {
    console.log(sortPlayer);

    return (
        <>
            <Navbar />
            <h1>hay from sort</h1>

            {/* sortPlayer תעשה פה טבלה שבה מודפס התוכן של ה */}
            <thead>
                <tr>
                    <th>id</th>
                    <th>name</th>
                    <th>time</th>
                </tr>
            </thead>

            <tbody>
                {sortPlayer.map(item => ( 
                    <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.time}</td>
                    </tr>
                 ))}
            </tbody>

            <h2>lader player</h2>
            <p>{sortPlayer[0]?.name}</p>
        </>
    )
}