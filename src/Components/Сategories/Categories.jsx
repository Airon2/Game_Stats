import styles from './Categories.module.css'
import React, { useState } from 'react';
import SampleGames from './SampleGames';

let Categories = (props)=>{
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return(
        <div className={styles.Categories}>
            <div className={styles.Categories_wrapper}>
                <div className={styles.genre_dropdown}>
                    <div className={styles.all_games} onClick={toggleMenu}>
                        Все игры
                    </div>
                    {isOpen && (
                        <div className={styles.genre_menu}>
                            <ul>
                                <li>Экшн</li>
                                <hr/>
                                <li>РПГ</li>
                                <hr/>
                                <li>Приключения</li>
                                <hr/>
                                <li>Спорт</li>
                                <hr/>
                                <li>Шутеры</li>
                            </ul>
                        </div>
                    )}
                </div>
                <div className={styles.Games}>
                {props.GamesPage.games.map((game)=>(
                    <SampleGames
                    name = {game.name}
                    image = {game.image}
                    id = {game.id}
                    key = {game.id}/>
                ))}
                </div>
            </div>
        </div>
    )
}

export default Categories;