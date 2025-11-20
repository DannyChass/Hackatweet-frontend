import { useDispatch, useSelector } from "react-redux";
import { useState } from 'react';
import styles from '../styles/Tweet.module.css';

function Tweet({ tweet, onDelete }) {

    const user = useSelector((state) => state.user.value);
    const [liked, setLiked] = useState(false);

    const timeSince = (date) => {
        const now = new Date();
        const diff = Math.floor((now - new Date(date)) / 3600000);
        return diff === 0 ? "Just now" : `${diff} hour${diff > 1 ? "s" : ""} ago`;
    };

    const toggleLike = () => {
        setLiked(!liked);
    };

    return (
        <div className={styles.tweetContainer}>
            <div className={styles.header}>
                <span className={styles.name}>{tweet.author.firstname}</span>
                <span className={styles.username}>@{tweet.author.username}</span>
                <span className={styles.time}>{timeSince(tweet.createdAt)}</span>
            </div>

            <div className={styles.content}>{tweet.content}</div>

            <div className={styles.actions}>
                <button className={styles.like} onClick={toggleLike}>
                    {liked ? "❤️" : "🤍"}
                </button>

                {user && user.username === tweet.author.username && (
                    <button className={styles.delete} onClick={() => onDelete(tweet._id)}>
                        🗑️
                    </button>
                )}
            </div>
        </div>
    )
}

export default Tweet;