import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import Tweet from '../components/Tweet'
import Trends from '../components/Trends'
import TrendPage from '../components/TrendPage';
import { useRouter } from 'next/router'

import { useSelector } from 'react-redux';

function Home() {

    const hashtag = /([#])\w+/g
    const router = useRouter();
    const [newTweet, setNewTweet] = useState('');

    const [allTweet, setAllTweet] = useState([]);

    const [selectedTrend, setSelectedTrend] = useState(null);

    const countLetter = `${newTweet.length}/280`

    const token = useSelector((state) => state.user.value.token);
    const username = useSelector((state) => state.user.value.username);
    const firstname = useSelector((state) => state.user.value.firstname);

    const addTweet = () => {
        const trends = newTweet.match(hashtag)
        fetch('http://localhost:3000/tweets/new', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: token, content: newTweet, trends: trends }),
        })
            .then(response => response.json())
            .then(data => {
                setNewTweet('')
                setAllTweet([data.tweet, ...allTweet])
            })


    };

    useEffect(() => {
        fetch('http://localhost:3000/tweets/all')
            .then(response => response.json())
            .then(data => {
                setAllTweet(data.tweets);
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

                const filteredTweet = allTweet.filter((e) => {
                    return e.id !== data.deletedTweetId
                })
                setAllTweet(filteredTweet);
            });
    };

    const openTrendPage = (trendName) => {
        setSelectedTrend(trendName);  // "#hackatweet"
    };
    console.log(allTweet)
    const allTheTweet = allTweet.map((tweet, i) => {
        return <Tweet key={i} id={tweet.id} content={tweet.content} author={{ username: tweet.author, firstname: tweet.firstname }} like={tweet.likes} createdAt={tweet.date} onDelete={deleteTweet} />
    })

    const logout = () => {
        router.push('/')
    }

    return (
        <>
            <div className={styles.container}>
                <div className={styles.blockLeft}>
                    <img src="./logo.png" height={100} width={100} />
                    <div className={styles.boxLogout}>
                        <div className={styles.boxProfil}>
                            <img src="./profil.jpg" height={40} width={40} />
                            {firstname}
                            <span>@{username}</span>
                        </div>
                        <button onClick={() => logout()} className={styles.buttonLogout}>Logout</button>
                    </div>

                </div>
                <div className={styles.blockCenter}>
                    {selectedTrend ? (
                        <TrendPage trend={selectedTrend} />
                    ) : (
                        <>
                            <div className={styles.newTweet}>
                                <h1 className={styles.title1}>Home</h1>
                                <textarea
                                    onChange={(e) => setNewTweet(e.target.value)}
                                    value={newTweet}
                                    className={styles.input}
                                    type='text'
                                    maxlength="280"
                                    placeholder="What's up"
                                />
                                <div className={styles.countButton}>
                                    <span className={styles.countLetter}>{countLetter}</span>
                                    <button onClick={() => addTweet()} className={styles.buttonTweet}>Tweet</button>
                                </div>
                            </div>

                            <div className={styles.allTweet}>
                                {allTheTweet}
                            </div>
                        </>
                    )}
                </div>
                <div className={styles.blockRight}>
                    <Trends onSelectTrend={openTrendPage} />
                </div>
            </div>
        </>
    )

}

export default Home;