import { useState, useContext, useEffect } from "react";
import { AppContext } from "../../AppContextProvider";
import styles from "./Playlist.module.css";
import axios from 'axios'

export default function Playlist() {
    //placeholder playlist
    const [tracks, setTracks] = useState(
        [{
            title: "Empty Queue"
        }]
    );
    const { roomID, password } = useContext(AppContext)
    const room = {
        roomid: roomID,
        password: password
    }

    const [index, setIndex] = useState(0);
    const [extension, setExtension] = useState(0);
    const [statusText, setStatusText] = useState("Paused...");
    const [currentSongTitle, setCurrentSongTitle] = useState(tracks[0].title);
    const [playing, setPlaying] = useState(false);
    const [version,setVersion] = useState(false);

    // initialize playlist and controls
    const trackCount = tracks.length;

    const changeStatusText = () => {
        // change playing status (if needed)
        setStatusText(playing ? "Now Playing" : "Paused");
    };

    const handlePlay = () => {
        // handle playing (unmuting) functionality here
    };
    const handlePause = () => {
        // handle pausing (muting) functionality here
    };
    const songEnd = () => {
        // handle play next song functionality here
    };

    const handlePrev = () => {
        // handle vote to reply song functionality here
    };

    const handleNext = () => {
        // add vote to skip song functionality here
    };

    const playTrack = (id) => {
        // add audio playing functionality here
    };

   {/*} async function getPlaylist(){
        const response = await axios.post('http://localhost:3000/api/Playlist/getall/', room);

        if(response.data.length > 0){
            setTracks(response.data)
        } else {
            setTracks(        
            [{title: "Empty Queue"}]
            )
        };
    }; */}
    
    useEffect(() => {
        async function fetchData() {
            const response = await axios.post("http://localhost:3000/api/playlist/getall/", room);
            if (response.data.length > 0){
            const songs = response.data;
            console.log(songs);
            setTracks(songs);
            } else {
                setTracks([{
                    title: "Empty Queue"
                }]);
            }
        }
        fetchData();
    },[version]);


    const buildPlaylist = tracks.map((song, index) => {
        return (
            <li key={index}>
                <div className={styles.playlistItem}>
                    <span className={styles.songNumber}>{index+1}</span>
                    <span className={styles.songTitle}>{song.title}</span>
                    {/*<span className={styles.songLength}>{song.duration}</span>*/}
                </div>
            </li>
        );
    });

    return (
        <>
            <div className={styles.container}>
                <div className={styles.column}>
                    <ul className={styles.playlist}>{buildPlaylist}</ul>
                </div>
            </div>
        </>
    );
}
