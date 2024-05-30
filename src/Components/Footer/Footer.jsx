import styles from './Footer.module.css'

let Footer = ()=>{
    return(
        <div className={styles.Footer}>
            <div className={styles.Footer_wrapper}>
                <p className={styles.Footer_Text}>"© 2024 Stats Все права защищены | Статистика игроков | Статистика игр | Политика конфиденциальности | Условия использования"</p>
                <img className={styles.footer_icon} src="./images/twitter.png"/>
                <img className={styles.footer_icon} src="./images/discord.png"/>
                <img className={styles.footer_icon} src="./images/instagram.png"/>
            </div>
        </div>
    )
}

export default Footer;