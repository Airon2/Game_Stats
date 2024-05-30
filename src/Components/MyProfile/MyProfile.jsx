import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProfile } from '../../services/api';
import styles from './MyProfile.module.css';

const MyProfile = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [games, setGames] = useState([]);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const currentUser = JSON.parse(localStorage.getItem('user'));
                const response = await getProfile(currentUser.pk);
                setProfile(response.data);
                setGames(response.data.games);
            } catch (error) {
                console.error('Ошибка получения профиля:', error);
            }
        };

        fetchProfile();
    }, []);

    const viewGameDetails = (gameId) => {
        navigate(`/game/${gameId}`);
    };

    if (!profile) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.MyProfile}>
            <div className={styles.MyProfile_wrapper}>
                <div className={styles.information}>
                    <div className={styles.MyProfile_img}>
                        <img className={styles.MyProfile_img1} src={profile.avatar || "./images/user.png"} alt="Avatar" />
                    </div>
                    <div className={styles.MyProfile_info}>
                        <h1 className={styles.MyProfile_text}>{profile.nickname}</h1>
                        <h3 className={styles.MyProfile_text}>Steam ID: {profile.steamid}</h3>
                        <h3 className={styles.MyProfile_text}>Steam URL: <a href={profile.steam_url}>{profile.steam_url}</a></h3>
                    </div>
                </div>
                <hr />
                <div className={styles.profile_games}>
                    <h1 className={styles.MyProfile_text}>Мои игры</h1>
                    <div className={styles.profile_games_wrapper}>
                        {games.map((game, index) => (
                            <div className={styles.Games_sample} key={index}>
                                <div className={styles.Games_sample_wrapper}>
                                    <img className={styles.MyProfile_img} src={game.icon} alt={game.title} />
                                    <div className="div">
                                        <p className={styles.Profile_game_text}><b>{game.title}</b></p>
                                    </div>
                                </div>
                                <button className={styles.MyProfile_btn} onClick={() => viewGameDetails(game.game_id)}>Подробности</button>
                            </div>
                        ))}
                        <div className={styles.Games_sample}>
                            <a href="/add_game" className={styles.MyProfile_btn}>+Добавить игру</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;
