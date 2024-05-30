import styles from './MyProfile.module.css';

let SampleMyprofileGameStatistic = ()=>{
    return(
        <div className={styles.SampleMyprofileGameStatistic}>
            <div className={styles.SampleMyprofileGameStatistic_wrapper}>
                <div className={styles.MyStatistic}>
                    <li className={styles.Mystatistic_text}>НИК :</li>
                    <li className={styles.Mystatistic_text}>ID :</li>
                    <li className={styles.Mystatistic_text}>УРОВЕНЬ :</li>
                    <li className={styles.Mystatistic_text}>ВРЕМЯ В ИГРЕ :</li>
                    <li className={styles.Mystatistic_text}>РАНГ ИЛИ РЕЙТИНГ :</li>
                    <li className={styles.Mystatistic_text}>ОЧКИ ОПЫТА :</li>
                    <li className={styles.Mystatistic_text}>КОЛИЧЕСТВО ДОСТИЖЕНИЙ :</li>
                    <li className={styles.Mystatistic_text}>КОЛИЧЕСТВО ПОБЕД :</li>
                </div>
                <hr class={styles.vertical_hr}/>
                <div className={styles.MyStatistic}>  
                    <li className={styles.Mystatistic_text}>КОЛИЧЕСТВО ПРОИГРЫШЕЙ :</li>
                    <li className={styles.Mystatistic_text}>КОЛИЧЕСТВО СМЕРТЕЙ :</li>
                    <li className={styles.Mystatistic_text}>УБИЙСТВА :</li>
                    <li className={styles.Mystatistic_text}>НАНЕСЕНО УРОНА :</li>
                    <li className={styles.Mystatistic_text}>ПОЛУЧЕНО УРОНА :</li>
                    <li className={styles.Mystatistic_text}>ТОЧНОСТЬ СТРЕЛЬБЫ :</li>
                    <li className={styles.Mystatistic_text}>КОЛИЧЕСТВО СЫГРАННЫХ ИГР :</li>
                </div>
            </div>
        </div>
    )
}

export default SampleMyprofileGameStatistic