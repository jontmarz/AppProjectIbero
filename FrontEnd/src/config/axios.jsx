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

const initAxiosInterceptors = () => {
    axios.interceptors.request.use((config) => {
        const token = getToken()
        // console.log(token);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config
    }, (error) => Promise.reject(error))
}

/* axios.interceptors.response.use(
    (response) => response,

    (e) => {
        if (e.response.status === 401) {
            deleteToken()
            window.location = "/"
        }
        return Promise.reject(e)
    }
) */

const api = axios.create({
    baseURL: import.meta.env.VITE_MY_API_REST,
    headers: {  "Content-Type": "application/json" }
})

export { api, setToken, getToken, deleteToken, initAxiosInterceptors }