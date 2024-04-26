import axios from 'axios'

const tokenKey = import.meta.env.VITE_TOKEN_KEY

const setToken = (token) => {
    return localStorage.setItem(tokenKey, token)
}

const getToken = () => {
    return localStorage.getItem(tokenKey)
}

const deleteToken = () => {
    return localStorage.clear()
}

const api = axios.create({
    baseURL: import.meta.env.VITE_MY_API_REST,
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }
})

api.interceptors.request.use((config) => {
    if (!config.url.endsWith('/')) {
        config.url += '/'
    }
    const token = getToken()
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export { api, setToken, getToken, deleteToken }