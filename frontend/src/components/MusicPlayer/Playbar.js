import { Container, ProgressBar } from "react-bootstrap";
import styles from "./Playbar.module.css";
import SongControls from "./SongControls";
import SongInfo from "./SongInfo";
import { AppContext } from "../../AppContextProvider";
import "react-bootstrap";
import React, { useContext, useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import axios from "axios";

export default function Playbar() {
    const [duration, setDuration] = useState(0);
    const [songLength, setSongLength] = useState(0);
    const [volume, setVolume] = useState(30); // Initial volume
    const [player, setPlayer] = useState();

    const { socket, currentSong, key, playing, setPlaying, currentRoom } = useContext(
        AppContext
    );

    const ref = player => { setPlayer(player) }

    function currentSongContext() {
        if (currentSong) {
            return currentSong.content;
        } else {
            console.log(`No current song!`);
        }
    }

    function handleOnProgress(e) {
        setDuration(e.playedSeconds.toFixed(0));
    }
    function handleSongLengthChange(e) {
        setSongLength(e.toFixed(0) - 1);
    }

    async function handleOnEnded(e) {
        console.log("Playing ended");
        socket.emit("Song ended", currentSong);
        await axios.post('http://localhost:3000/api/room/end/', currentSong);
    }

    async function handleOnStart(e) {
        //socket.emit("Song start", currentSong);
        const response = await axios.post('http://localhost:3000/api/room/start/', currentSong);
        const elapsedTime = response.data;
        player.seekTo(elapsedTime);
        console.log(elapsedTime);
    }


    useEffect(() => {
        setVolume(0.5);
    }, []);
    return (
        <>
            <ReactPlayer
                ref={ref}
                url={currentSongContext()}
                onProgress={(e) => handleOnProgress(e)}
                onReady={() => {
                    setPlaying(true);
                    // player.seekTo(2);
                }}
                key={key}
                playing={playing}
                volume={volume}
                onDuration={(e) => handleSongLengthChange(e)}
                onEnded={(e) => handleOnEnded(e)}
                onStart={(e) => handleOnStart(e)}
                height="0"
                width="0"
            />
            <Container fluid className={styles.playbar}>
                <ProgressBar now={duration} min="0" max={songLength} />
                <Container fluid className={styles.playbarContainer}>
                    <div className={styles.songInfo}>
                        <SongInfo />
                    </div>
                    <SongControls className={styles.songControls} />

                    <Container className={styles.volumeControls}>
                        <input
                            type="range"
                            min={0}
                            max={1}
                            step={0.02}
                            value={volume}
                            onChange={(event) => {
                                setVolume(event.target.valueAsNumber);
                            }}
                        />
                    </Container>
                </Container>
            </Container>
        </>
    );
}
