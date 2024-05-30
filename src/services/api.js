import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/';

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Token ${token}` } : {};
};

export const getProfile = (userId) => {
    return axios.get(`${API_URL}profiles/${userId}/`, { headers: getAuthHeaders() });
};

export const getProfiles = () => {
    return axios.get(`${API_URL}profiles/`, { headers: getAuthHeaders() });
};

export const getGames = () => {
    return axios.get(`${API_URL}games/`, { headers: getAuthHeaders() });
};

export const getCurrentUser = () => {
    return axios.get(`${API_URL}auth/user/`, { headers: getAuthHeaders() });
};