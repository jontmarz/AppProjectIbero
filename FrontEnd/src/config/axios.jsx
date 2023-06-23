import axios from 'axios'

const tokenKey = "appIbero_token";

const setToken = (token) => {
    return localStorage.setItem(tokenKey, token)
}

const getToken = () => {
    return localStorage.getItem(tokenKey)
}

const deleteToken = () => {
    return localStorage.removeItem(tokenKey)
}

const api = axios.create({
    baseURL: import.meta.env.VITE_MY_API_REST,
    headers: {  "Content-Type": "application/json" }
})

export { api, setToken, getToken, deleteToken }