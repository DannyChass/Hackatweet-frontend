import { useState } from 'react'
import styles from '../styles/Login.module.css'


function Login() {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [firstname, setFirstname] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const showModal = () => {
        setIsModalVisible(true);
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


    const modal = (
        <>
            <div className={styles.modal} >
                <input onChange={(e) => setFirstname(e.target.value)} value={firstname} className={styles.input} type='text' placeholder='firstname' />
                <input onChange={(e) => setUsername(e.target.value)} value={username} className={styles.input} type='text' placeholder='username' />
                <input onChange={(e) => setPassword(e.target.value)} value={password} className={styles.input} type='text' placeholder='password' />
                <button onClick={() => addUser()} className={styles.buttonSignUp}>Register</button>
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
                    <h1 className={styles.title1}>See what's happening</h1>
                    <h4 className={styles.title2}>Join Hackatweet today.</h4>
                    <button onClick={() => showModal()} className={styles.buttonSignUp}>Sign Up</button>
                    {isModalVisible && modal}
                    <span className={styles.text}>Already have an account ?</span>
                    <button className={styles.buttonSignIn}>Sign In</button>

                </div>

            </div>

            

        </div>
    )

}

export default Login;