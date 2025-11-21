import { useEffect, useState } from "react";
import Tweet from "./Tweet";
import styles from "../styles/Home.module.css";

export default function TrendPage({ trend }) {
    const [search, setSearch] = useState(trend);
    const [tweets, setTweets] = useState([]);

    useEffect(() => {
        const loadTweets = async () => {
            console.log(`http://localhost:3000/trends/tweets/${trend}`);
            const res = await fetch(`http://localhost:3000/trends/tweets/${trend}`);
            const data = await res.json();
            console.log(data);
            if (data.result) setTweets(data.tweets);
        };
        loadTweets();
    }, [trend]);

    return (
        <>
            <div className={styles.newTweet}>
            <h1 className={styles.title1}>{trend}</h1>

            <input
                className={styles.input}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            </div>
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