import { useState } from 'react'
import styles from '../styles/Home.module.css'


function Home() {

    const [newTweet, setNewTweet] = useState('');

    const addTweet = () => {
        fetch('http://localhost:3000/tweets/new', {
            method : 'POST',
            headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({token : token, content: newTweet}),
        })
    }

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
                        {tweets}
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