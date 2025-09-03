import Navbar from "../Navbar"
import { riddles } from "../../data/fakeData";
import styles from "../../style/showriddle.module.css";

export default function ShowRiddle() {
    return (
        <>
            <Navbar />
            <h1 className={styles.title_riddles}>all riddles</h1>
            <section className={styles.position_table}>
                <thead>
                    <tr>
                        <th>_id</th>
                        <th>name</th>
                        <th>taskDescription</th>
                        <th>correctAnswer</th>
                    </tr>
                </thead>
                <tbody>
                    {riddles.map(item => (
                        <tr key={item._id}>
                            <td>{item._id}</td>
                            <td>{item.name}</td>
                            <td>{item.taskDescription}</td>
                            <td>{item.correctAnswer}</td>
                        </tr>
                    ))}
                </tbody>
            </section>
        </>
    )
}