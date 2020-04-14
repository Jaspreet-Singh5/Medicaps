import axios from 'axios';

const instance = axios.create({
    // baseURL: 'https://spec-erp.herokuapp.com/api/admin/'
    baseURL: 'http://localhost:5000/api/admin/'
});

export default instance;    