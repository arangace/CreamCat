import axios from 'axios';
//const KEY = "AIzaSyC999TNfjGm_PNaAylM6CUoXHdqus_xTRk";
const KEY = "AIzaSyDX7ksxehGOYLX5Lfw4lI21t45gzXmpIEw";


export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3/',
    params: {
        part: 'snippet',
        maxResults: 5,
        key: KEY
    }
})