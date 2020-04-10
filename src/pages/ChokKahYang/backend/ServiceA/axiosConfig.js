const axios = require('axios')

let axiosInstance = axios.create({
    baseURL: 'http://localhost:4000',
    /* other custom settings */
});

module.exports = axiosInstance;