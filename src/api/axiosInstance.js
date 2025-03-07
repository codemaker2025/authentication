import axios from 'axios'
import { loadable } from 'jotai/utils'
import { authTokenAtom } from '../atoms/authAtom'
import { getDefaultStore } from 'jotai'

const axiosInstance = axios.create({
    baseURL: 'https://core-skill-test.webc.in/employee-portal',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
})

const store = getDefaultStore()
const tokenLoadable = loadable(authTokenAtom)

axiosInstance.interceptors.request.use((config) => {
    const token = store.get(tokenLoadable)

    if (token.state === 'hasData' && token.data) {
        config.headers.Authorization = `Bearer ${token.data}`
    }

    return config
}, (error) => {
    return Promise.reject(error)
})

export default axiosInstance
