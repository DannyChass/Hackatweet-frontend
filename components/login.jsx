import styles from '../styles/Login.module.css'


function Login() {

    const showModal = () => {
        return (
            <>
                <div className={styles.modal} >
                    <input type='text' placeholder='firstname' />
                    <input type='text' placeholder='username' />
                    <input type='text' placeholder='password' />
                </div>
            </>
        )
    }



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
                    <span className={styles.text}>Already have an account ?</span>
                    <button onClick={() => showModal()} className={styles.buttonSignIn}>Sign In</button>

                </div>

            </div>

        </div>
    )

}

export default Login;