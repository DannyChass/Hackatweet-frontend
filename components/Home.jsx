import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import Tweet from '../components/Tweet'

import { useSelector } from 'react-redux';

function Home() {


    const [newTweet, setNewTweet] = useState('');

    const [allTweet, setAllTweet] = useState([]);

    const token = useSelector((state) => state.user.value.token);

    const addTweet = () => {
        fetch('http://localhost:3000/tweets/new', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: token, content: newTweet, trends: [] }),
        })
            .then(response => response.json())
            .then(data => {
                console.log(allTweet)

                setAllTweet([data.tweet, ...allTweet] )
            })
        
            
    };

    useEffect(() => {
        fetch('http://localhost:3000/tweets/all')
            .then(response => response.json())
            .then(data => {
                setAllTweet(data.tweets);
                console.log(data)
            });
    }, []);

    const deleteTweet = (id) => {
        fetch(`http://localhost:3000/tweets/delete/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: token }),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
            })
    }



    const allTheTweet = allTweet.map((tweet, i) => {
        return <Tweet key={i} content={tweet.content} author={{ username: tweet.username, firstname: tweet.firstname }} createdAt={tweet.date} />
    })



    return (
        <>
            <div className={styles.container}>
                <div className={styles.blockLeft}>
                    <img src="./logo.png" height={100} width={100} />

                </div>
                <div className={styles.blockCenter}>
                    <div className={styles.newTweet}>
                        <h1 className={styles.title1}>Home</h1>
                        <input onChange={(e) => setNewTweet(e.target.value)} value={newTweet} className={styles.input} type='text' placeholder='tweet' />
                        <button onClick={() => addTweet()} className={styles.buttonTweet}>Tweet</button>
                    </div>
                    <div className={styles.allTweet}>
                        {allTheTweet}
                    </div>

                </div>
                <div className={styles.blockRight}>
                    <h1 className={styles.title2}>Trends</h1>

                </div>
            </div>
        </>
    )

}

export default Home;