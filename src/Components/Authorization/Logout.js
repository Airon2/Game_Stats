import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Удаляем информацию о пользователе из localStorage (или другого места, где хранится информация о сеансе)
        localStorage.removeItem('user');

        // Дополнительные действия по завершению сеанса, такие как вызов API для разлогинивания на сервере
        // fetch('http://localhost:8000/api/auth/logout/', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': `Token ${accessToken}` // если требуется токен
        //     },
        // }).then(response => {
        //     if (response.ok) {
        //         navigate('/'); // Перенаправляем на главную страницу
        //     } else {
        //         console.error("Ошибка разлогинивания:", response.status);
        //     }
        // }).catch(error => {
        //     console.error("Произошла ошибка:", error);
        // });

        // Перенаправляем пользователя на главную страницу или другую страницу после выхода
        navigate('/'); // Например, перенаправляем на главную страницу
    };

    return (
        <div>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Logout;
