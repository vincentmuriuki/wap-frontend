import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://wap-backend.herokuapp.com'
})

export default instance