import axios from 'axios'

// const tokenKey = "appIbero_token";
const tokenKey = import.meta.env.VITE_TOKEN_KEY;
var myToken = ''

const setToken = (token) => {
    myToken = token;
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
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }
})

export { api, setToken, getToken, deleteToken }