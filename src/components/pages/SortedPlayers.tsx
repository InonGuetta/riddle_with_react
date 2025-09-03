import Navbar from "../Navbar";
import { sortPlayer } from "../../services/sortPlayers";
import styles from "../../style/sortedplayers.module.css";


export default function SortedPlayrs() {
    console.log(sortPlayer);
    return (
        <>
            <Navbar />
            <h1 className={styles.leader}>the lader player it's - {sortPlayer[0]?.name}</h1>
            <section className={styles.position_table}>
                <thead>
                    <tr className={styles.tr_head}>
                        <th className={styles.th_head}>id</th>
                        <th className={styles.th_head}>name</th>
                        <th className={styles.th_head}>time</th>
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
            </section>
        </>
    );
}