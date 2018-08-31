import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://my-burger-react-b5963.firebaseio.com/'
});

export default instance;