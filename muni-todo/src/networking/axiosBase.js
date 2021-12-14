import axios from 'axios'

const BaseURL = axios.create({
    baseURL:'http://192.168.1.105:3000',

})

export default BaseURL