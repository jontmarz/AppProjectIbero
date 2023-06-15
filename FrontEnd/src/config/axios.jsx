import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_MY_API_REST,
    headers: { "Content-Type": "application/json" }
})

export { api }