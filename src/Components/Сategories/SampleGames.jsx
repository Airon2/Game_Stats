import { useNavigate } from 'react-router-dom';
import styles from './Categories.module.css'

let SampleGames = (props)=>{
    const navigate = useNavigate();

    let GamesLider = ()=>{
        navigate('/GameLiders')
    }
 return(
    <div className={styles.SampleGames1}>
        <div className={styles.SampleGames}>
            <div className={styles.SampleGames_wrapper} onClick={GamesLider}>
                <img className={styles.Sample_Game_icon} src={props.image}/>
                <p className={styles.Sample_Game_text}>{props.name}</p>
            </div>
        </div>  
    </div>
 )
}

export default SampleGames;