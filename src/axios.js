import axios from 'axios'

const instance = axios.create({
    // baseURL: 'http://localhost:5137'
    baseURL: 'https://trchatback.onrender.com'    
})

instance.interceptors.request.use((config) => {
    config.headers.Authorization = localStorage.getItem('token')    
    return config
})

export default instance