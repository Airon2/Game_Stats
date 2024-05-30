import styles from './Main.module.css'

let Sample = ()=>{
    return(
        <div className={styles.Sample}>
            <img className={styles.Game_icon} src="./images/game_foto.jpg"/>
            <div className={styles.Sample_wrapper}>
                <h1 className={styles.Game_name_text}>Game Name</h1>   
                <h2 className={styles.Game_name_text}>Топ игроки</h2>

                <div className={styles.Game_Statistics}>
                    <img className={styles.Game_user_icon} src="./images/user.png"/>
                    <p><b>User Name</b></p>
                    <p><b>ВРЕМЯ ИГРЫ</b> <br/>
                    Статистика</p>
                    <p><b>KD</b><br/>
                    Статистика</p>
                </div>
                <div className={styles.Game_Statistics}>
                    <img className={styles.Game_user_icon} src="./images/user.png"/>
                    <p><b>User Name</b></p>
                    <p><b>ВРЕМЯ ИГРЫ</b> <br/>
                    Статистика</p>
                    <p><b>KD</b><br/>
                    Статистика</p>
                </div>
                <div className={styles.Game_Statistics}>
                    <img className={styles.Game_user_icon} src="./images/user.png"/>
                    <p><b>User Name</b></p>
                    <p><b>ВРЕМЯ ИГРЫ</b> <br/>
                    Статистика</p>
                    <p><b>KD</b><br/>
                    Статистика</p>
                </div>
                <button className={styles.Sample_btn}>ПОДРОБНЕЕ</button>
            </div>
        </div>
    )
}

export default Sample