import styles from '../styles/Trend.module.css';

function Trend(props) {
    return (
        <div className={styles.trend} onClick={props.onClick}>
            <span className={styles.name}>{props.name}</span>
            <span className={styles.count}>{props.count} Tweets</span>
        </div>
    )
}

export default Trend;