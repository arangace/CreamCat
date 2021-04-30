import axios from 'axios';
const KEY = "AIzaSyB85BD-nTu-7aMSHkNX9GlO2rKHMUisivk";

export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3/',
    params: {
        part: 'snippet',
        maxResults: 5,
        key: KEY
    }
})