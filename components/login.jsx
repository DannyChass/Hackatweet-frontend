import { useState } from 'react'
import styles from '../styles/Login.module.css'


function Login() {

    const [isModalVisibleSignUp, setIsModalVisibleSignUp] = useState(false);
    const [isModalVisibleSignIn, setIsModalVisibleSignIn] = useState(false);
    const [firstname, setFirstname] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const showModalSignUp = () => {
        setIsModalVisibleSignUp(true);
    }

    const showModalSignIn = () => {
        setIsModalVisibleSignIn(true);
    }

    const hideModal = () => {
        setIsModalVisible(false);
    }

    const addUser = () => {
        fetch('http://localhost:3000/users/signup', {
            method : 'POST',
            headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({firstname : firstname, username: username, password: password }),
        })
        .then (response => response.json())
        .then (data => {
            console.log("New User add")
            console.log(data)
        })

    }

    const logUser = () => {
        fetch('http://localhost:3000/users/signin', {
            method : 'POST',
            headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({username: username, password: password }),
        })
        .then (response => response.json())
        .then (data => {
            console.log("User log")
        })

    }

    const modalSignUp = (
        <>
            <div className={styles.modal} >
                <input onChange={(e) => setFirstname(e.target.value)} value={firstname} className={styles.input} type='text' placeholder='firstname' />
                <input onChange={(e) => setUsername(e.target.value)} value={username} className={styles.input} type='text' placeholder='username' />
                <input onChange={(e) => setPassword(e.target.value)} value={password} className={styles.input} type='text' placeholder='password' />
                <button onClick={() => addUser()} className={styles.buttonSignUp}>Register</button>
            </div>
        </>
    );

    const modalSignIn = (
        <>
            <div className={styles.modal} >
                <input onChange={(e) => setUsername(e.target.value)} value={username} className={styles.input} type='text' placeholder='username' />
                <input onChange={(e) => setPassword(e.target.value)} value={password} className={styles.input} type='text' placeholder='password' />
                <button onClick={() => logUser()} className={styles.buttonSignUp}>Register</button>
            </div>
        </>
    );

    return (
        <div>
            <div className={styles.container}>
                <div className={styles.backgroundLeft}>
                    < img src="./logo.png" />
                </div>
                <div className={styles.backgroundRight}>
                    <img src="./logo.png" height={100} width={100} />
                    <h1 className={styles.title1}>See what's <br></br>happening</h1>
                    <div className={styles.buttonContainer}>
                    <h4 className={styles.title2}>Join Hackatweet today.</h4>
                    <button onClick={() => showModalSignUp()} className={styles.buttonSignUp}>Sign Up</button>
                    {isModalVisibleSignUp && modalSignUp}
                    <span className={styles.text}>Already have an account ?</span>
                    <button onClick={() => showModalSignIn()} className={styles.buttonSignIn}>Sign In</button>
                    {isModalVisibleSignIn && modalSignIn}
                    </div>
                </div>

            </div>

            

        </div>
    )

}

export default Login;