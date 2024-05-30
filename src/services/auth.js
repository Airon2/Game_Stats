import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/auth/';

export const login = (email, password) => {
    return axios.post(`${API_URL}login/`, { email, password });
};

export const logout = () => {
    return axios.post(`${API_URL}logout/`);
};

export const register = (email, password1, password2) => {
    return axios.post(`${API_URL}registration/`, { email, password1, password2 });
};
