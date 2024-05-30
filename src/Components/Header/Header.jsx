import styles from './Header.module.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Header = () => {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                setCurrentUser(JSON.parse(storedUser));
            } catch (error) {
                console.error("Error parsing user from localStorage:", error);
                localStorage.removeItem('user');
            }
        }
    }, []); // Пустой массив зависимостей означает, что эффект будет запущен только один раз при монтировании компонента

    const isAuthenticated = currentUser !== null;

    const logOut = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token"); // Удаляем токен при выходе
        console.log("User logged out");
        setCurrentUser(null);
        navigate('/');
    };

    console.log("Current user:", currentUser);

    return (
        <div className={styles.Header}>
            <div className={styles.Header_wrapper}>
                <input className={styles.Header_input} placeholder="   Поиск Игры"/>
                <div className={styles.Header_form}>
                    <NavLink to={"/"} className={styles.navigator_text}>ГЛАВНАЯ</NavLink>
                    <NavLink to={"/Categories"} className={styles.navigator_text}>ТАБЛИЦЫ ЛИДЕРОВ</NavLink>
                    <NavLink to={"/MyProfile"} className={styles.navigator_text}>МОЙ ПРОФИЛЬ</NavLink>
                    {
                        isAuthenticated ? 
                        (<NavLink className={styles.navigator_text} onClick={logOut}>ВЫЙТИ</NavLink>)
                        : 
                        (<NavLink to={"register"} className={styles.navigator_text}>РЕГИСТРАЦИЯ</NavLink>)
                    }
                </div>
            </div>
        </div>
    );
};

export default Header;
