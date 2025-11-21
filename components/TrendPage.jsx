import { useEffect, useState } from "react";
import Tweet from "./Tweet";
import styles from "../styles/Home.module.css";

export default function TrendPage({ trend }) {
    const [search, setSearch] = useState(trend);
    const [tweets, setTweets] = useState([]);

    useEffect(() => {
        const loadTweets = async () => {
            const clean = trend.replace("#", "");
            const res = await fetch(`http://localhost:3000/trends/tweets/${clean}`);
            const data = await res.json();
            if (data.result) setTweets(data.tweets);
        };
        loadTweets();
    }, [trend]);

    return (
        <>
            <h1 className={styles.title1}>{trend}</h1>

            <input
                className={styles.input}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <div className={styles.allTweet}>
                {tweets.map((t, i) => (
                    <Tweet
                        key={i}
                        id={t.id}
                        content={t.content}
                        author={{ username: t.author, firstname: t.firstname }}
                        createdAt={t.date}
                    />
                ))}
            </div>
        </>
    );
}