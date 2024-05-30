import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './Authorization.module.css';

const Login = () => {
    const navigate = useNavigate();
    const [eyes, setEyes] = useState(false);
    const [newUser, setNewUser] = useState({
        email: '',
        password: ''
    });

    const signIn = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/auth/login/', newUser, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = response.data;
            console.log("Received data:", data);
            
            localStorage.setItem('token', data.key);  // Сохраняем токен под ключом 'token'
            
            // Получаем информацию о пользователе с использованием токена
            const userResponse = await axios.get('http://localhost:8000/api/auth/user/', {
                headers: {
                    'Authorization': `Token ${data.key}`
                }
            });

            const userData = userResponse.data;
            console.log("User data:", userData);
            
            localStorage.setItem('user', JSON.stringify(userData)); // Сохраняем данные пользователя

            navigate('/');
        } catch (error) {
            console.error('Error:', error);
            // Дополнительная обработка ошибки, например, показ сообщения пользователю
        }
    };
    
    return (
        <div className={styles.registration_wrapper}>
            <div className={styles.login_container}>
                <div className={styles.login_description}>
                    <h1 className={styles.login_coffee_shop_name}>Stats</h1>
                    <h1 className={styles.login_coffee_shop_name}>Войти в аккаунт</h1>
                </div>
                
                <div className={styles.registration_information}>
                    <input
                        className={styles.registration_input}
                        type='email'
                        placeholder='Email'
                        value={newUser.email}
                        onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                    />
                    <input
                        className={styles.registration_input}
                        type={eyes ? "text" : "password"}
                        placeholder='Пароль'
                        value={newUser.password}
                        onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                    />
                    {
                        eyes ? (
                            <span className={styles.login_span} onClick={() => setEyes(false)}>
                                <FaEye />
                            </span>
                        ) : (
                            <span className={styles.login_span} onClick={() => setEyes(true)}>
                                <FaEyeSlash />
                            </span>
                        )
                    }   
                    <button className={styles.registration_btn} onClick={signIn}>Вход</button>
                    <div className={styles.registration2}>
                        <div className={styles.registration2_wrapper}>
                            <img className={styles.registration_icon} src='./images/steam.png' alt="Steam"/>
                            <p>Войти через Steam</p>
                        </div>
                        <div className={styles.registration2_wrapper}>
                            <img className={styles.registration_icon} src='./images/google.png' alt="Google"/>
                            <p>Войти через Google</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
