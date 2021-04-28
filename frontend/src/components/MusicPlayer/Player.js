import "react-bootstrap";
import { useContext, useState, useEffect } from 'react';
import { AppContext } from '../../AppContextProvider';
import ReactPlayer from 'react-player';
import axios from 'axios';

export default function Player() {
    const { roomID, name, description, password, playing, handleplay, handleSetDuration, handleSongLength } = useContext(AppContext);

    const [keyword, setKeyword] = useState();

    const [result, setResult] = useState([]);

    const [playlist, setPlaylist] = useState([]);

    const [url, setUrl] = useState("");

    let a = 0;

    const props = {
        roomid: roomID,
        password
    };

    useEffect(() => {
        async function fetchData() {
            console.log(props);
            const response = await axios.post("http://localhost:3000/api/playlist/getall/", { roomid: roomID, password });
            console.log(response);
            const songs = response.data;
            console.log(songs);
            console.log(playlist);
            setPlaylist(songs);


        }
        fetchData();
    }, a);

    function seturl(url) {
        setUrl(url);
    }


    async function search() {
        //https://developers.google.com/youtube/v3/docs/search/list
        const response = await axios.get(`https://www.googleapis.com/youtube/v3/search?q=${keyword}&key=AIzaSyDX7ksxehGOYLX5Lfw4lI21t45gzXmpIEw&part=snippet`);
        const newresult = response.data.items;
        setResult(newresult);
        console.log(result);
    }

    async function add(song) {
        const prop = {
            // image: song.snippet.default.url,
            roomid: roomID,
            password,
            image: '123',
            title: song.snippet.title,
            description: song.snippet.description,
            publishTime: song.snippet.publishTime,
            content: 'https://www.youtube.com/watch?v=' + song.id.videoId,
            channelTitle: song.snippet.channelTitle,
            source: "YouTube"
        }
        console.log(prop);
        const response = await axios.post("http://localhost:3000/api/playlist/add/", prop);
        const response3 = await axios.post("http://localhost:3000/api/playlist/getall/", { roomid: roomID, password });
        const songs = response3.data;
        setPlaylist(songs);
        console.log(a);
        // const songs = await axios.post("http://localhost:3000/api/playlist/getall/", prop);
        // setPlaylist(songs);
    }


    function handleplayClick() {
        handleplay(!playing);
    }
    function handleVolumeClick() {

    }
    function handleonProgress(e) {
        handleSetDuration(e.playedSeconds);
        console.log(e.playedSeconds);
    }
    function handleSongLengthChange(e) {
        console.log("time" + e)
        handleSongLength(e);
    }
    return (
        <>
            <div>{roomID}</div>
            <div>{name}</div>
            <div>{description}</div>

            <input type='textbox' onInput={e => setKeyword(e.target.value)} />
            <button onClick={search}>search</button>
            <div>
                {/* {result[0] ? <p>{result[0].snippet.title}</p> : <p>1</p>} */}
                {result.map(r => (
                    <div style={{ borderTop: '1px solid' }}>
                        <div>image: <img src={r.snippet.thumbnails.default.url} /></div>
                        <div>title: {r.snippet.title}</div>
                        <div>description: {r.snippet.description}</div>
                        <div>publishTime: {r.snippet.publishTime}</div>
                        <div>channelTitle: {r.snippet.channelTitle}</div>
                        <div>source: YouTube</div>
                        <div><button onClick={e => add(r)}>add</button></div>
                    </div>
                ))}
            </div>
            {/* https://www.npmjs.com/package/react-player */}
            {/* <ReactPlayer url={url} playing={play} height='0' width='0' /> */}
            <ReactPlayer url={"https://www.youtube.com/watch?v=5TrM0rFaclw&ab_channel=GiveonVEVO"}
                onProgress={e => (handleonProgress(e))}
                playing={playing}
                volume={0.5}
                onDuration={e => (handleSongLengthChange(e))}
                height='0'
                width='0' />
            <button onClick={handleplayClick}>{playing ? <p>pause</p> : <p>play</p>}</button>

            <div>
                {playlist.map(song => (
                    <div style={{ borderTop: '1px solid' }}>
                        <div>image: <img src={song.image} /></div>
                        <div>title: {song.title}</div>
                        <div>description: {song.description}</div>
                        <div>publishTime: {song.publishTime}</div>
                        <div>channelTitle: {song.channelTitle}</div>
                        <div>source: {song.source}</div>
                        <div><button onClick={e => seturl(song.content)}>play</button></div>
                    </div>
                ))}
            </div>

        </>
    );
}