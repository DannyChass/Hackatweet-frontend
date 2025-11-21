import { useState } from 'react'
import styles from '../styles/Login.module.css'
import { useRouter } from 'next/router'

import { useDispatch } from 'react-redux';
import { userData } from '../reducers/user';


function Login() {
    

    const dispatch = useDispatch()
    const router = useRouter();

    const [isModalVisibleSignUp, setIsModalVisibleSignUp] = useState(false);
    const [isModalVisibleSignIn, setIsModalVisibleSignIn] = useState(false);
    const [firstname, setFirstname] = useState('');
    const [usernameSignUp, setUsernameSignUp] = useState('');
    const [passwordSignUp, setPasswordSignUp] = useState('');
    const [usernameSignIn, setUsernameSignIn] = useState('');
    const [passwordSignIn, setPasswordSignIn] = useState('');

    const showModalSignUp = () => {
        setIsModalVisibleSignUp(true);
    }

    const unShowModalSignUp = () => {
        setIsModalVisibleSignUp(false);
    }

    const showModalSignIn = () => {
        setIsModalVisibleSignIn(true);
    }
    
    const unShowModalSignIn = () => {
        setIsModalVisibleSignIn(false);
    }

    const hideModal = () => {
        setIsModalVisible(false);
    }

    const addUser = () => {
        fetch('http://localhost:3000/users/signup', {
            method : 'POST',
            headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({firstname : firstname, username: usernameSignUp, password: passwordSignUp }),
        })
        .then (response => response.json())
        .then (data => {
            dispatch(userData(data.user))
            router.push('/home')
        })

    }

    const logUser = () => {
        fetch('http://localhost:3000/users/signin', {
            method : 'POST',
            headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({username: usernameSignIn, password: passwordSignIn }),
        })
        .then (response => response.json())
        .then (data => {
            if (data.result===true) {
                dispatch(userData(data.user))
                router.push('/home')
            }
        })

    }

    const modalSignUp = (
        <>
            <div className={styles.modal} >
                <button onClick={() => unShowModalSignUp()} className={styles.buttonX}>X</button>
                <img src="./logo.png" height={100} width={100} />
                <span>Create your hackatweet account</span>
                <input onChange={(e) => setFirstname(e.target.value)} value={firstname} className={styles.input} type='text' placeholder='firstname' />
                <input onChange={(e) => setUsernameSignUp(e.target.value)} value={usernameSignUp} className={styles.input} type='text' placeholder='username' />
                <input onChange={(e) => setPasswordSignUp(e.target.value)} value={passwordSignUp} className={styles.input} type='password' placeholder='password' />
                <button onClick={() => addUser()} className={styles.buttonSignUp2}>Sign Up</button>
            </div>
        </>
    );

    const modalSignIn = (
        <>
            <div className={styles.modal2} >
                <button onClick={() => unShowModalSignIn()} className={styles.buttonX}>X</button>
                <img src="./logo.png" height={100} width={100} />
                <input onChange={(e) => setUsernameSignIn(e.target.value)} value={usernameSignIn} className={styles.input} type='text' placeholder='username' />
                <input onChange={(e) => setPasswordSignIn(e.target.value)} value={passwordSignIn} className={styles.input} type='password' placeholder='password' />
               <button onClick={() => logUser()} className={styles.buttonSignIn2}>Sign In</button>
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