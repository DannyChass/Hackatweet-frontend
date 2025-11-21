import { useEffect, useState } from "react";
import Trend from './Trend';
import styles from '../styles/Trends.module.css';

function Trends(props) {
    const [trends, setTrends] = useState([]);

    useEffect(() => {
        async function loadTrends() {
            const res = await fetch("http://localhost:3000/trends/all");
            const data = await res.json();

            if (data.result) {
                setTrends(data.trends);
            }
        }

        loadTrends();
    }, [props.refreshTrends]);

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Trends</h1>

            {trends.map((t, i) => (
                <Trend
                    key={i}
                    name={t.name}
                    count={t.tweetCount}
                    onClick={() => props.onSelectTrend(t.name)}
                />
            ))}
        </div>
    )
}

export default Trends;