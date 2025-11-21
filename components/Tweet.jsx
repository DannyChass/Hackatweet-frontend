import { useDispatch, useSelector } from "react-redux";
import { useState } from 'react';
import styles from '../styles/Tweet.module.css';

function Tweet( props ) {

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
                <span className={styles.name}>{props.author.firstname}</span>
                <span className={styles.username}>@{props.author.username}</span>
                <span className={styles.time}>{timeSince(props.createdAt)}</span>
            </div>

            <div className={styles.content}>{props.content}</div>

            <div className={styles.actions}>
                <button className={styles.like} onClick={toggleLike}>
                    {liked ? "❤️" : "🤍"}
                </button>
                {user && user.username === props.author.username && (
                    <button className={styles.delete} onClick={() => props.onDelete(props.id)}>
                        🗑️
                    </button>
                )}
            </div>
        </div>
    )
}

export default Tweet;