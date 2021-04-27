import axios from 'axios';
const KEY = "AIzaSyBXiqLWS6HyAoKM6Fdb4etK5yeVv2c-Q8M";

export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3/',
    params: {
        part: 'snippet',
        maxResults: 5,
        key: KEY
    }
})