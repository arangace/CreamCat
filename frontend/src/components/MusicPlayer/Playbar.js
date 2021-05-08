import { Container, ProgressBar, Card, Badge } from "react-bootstrap";
import styles from "./Playbar.module.css";
import SongControls from "./SongControls";
import SongInfo from "./SongInfo";
import { AppContext } from "../../AppContextProvider";
import "react-bootstrap";
import React, { useContext, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import dayjs from "dayjs";
//import axios from "axios";

export default function Playbar() {
    const [duration, setDuration] = useState(0);
    const [songLength, setSongLength] = useState(0);
    const [volume, setVolume] = useState(0.3);
    const [player, setPlayer] = useState();
    const playbarRenderTime = 500;
    const ref = player => { setPlayer(player) }

    const { socket, currentSong, key, playing, setPlaying, elapsedTime, setElapsedTime } = useContext(
        AppContext
    );

    useEffect(() => {
        setVolume(0.3);
    }, []);

    function currentSongContext() {
        if (currentSong) {
            return currentSong.content;
        } else {
            console.log(`No current song!`);
        }
    }

    function handleOnProgress(e) {
        setDuration(e.playedSeconds);
    }
    function handleSongLengthChange(e) {
        setSongLength(e.toFixed(0) - 1);
    }

    async function handleOnEnded() {
        console.log(`Song ended ${dayjs().toString()}`);
        socket.emit("Song ended", currentSong);
        //await axios.post('http://localhost:3000/api/room/end/', currentSong);
    }

    async function handleOnStart() {
        console.log(`Song started ${dayjs().toString()}`);
        socket.emit("Song started", currentSong);
        //const response = await axios.post('http://localhost:3000/api/room/start/', currentSong);
        //const elapsedTime = response.data;
        console.log(`Setting song progress to ${elapsedTime}`)
        if (elapsedTime > songLength) {
            setElapsedTime(0);
            socket.emit("Song ended", currentSong);
        }
        else {
            player.seekTo(elapsedTime);
            setElapsedTime(0);
        }
    }

    return (
        <>
            <ReactPlayer
                ref={ref}
                url={currentSongContext()}
                onProgress={(e) => handleOnProgress(e)}
                progressInterval={playbarRenderTime}
                onReady={() => {
                    setPlaying(true);
                    // player.seekTo(2);
                }}
                key={key}
                playing={playing}
                volume={volume}
                onDuration={(e) => handleSongLengthChange(e)}
                onEnded={handleOnEnded}
                onStart={handleOnStart}
                height="0"
                width="0"
            />
            <Container fluid className={styles.playbar}>
                <div>
                    <ProgressBar className={styles.progressBar} now={duration} min="0" max={songLength} />
                    <div className={styles.durationTime}>
                        <Badge pill variant="secondary" >{new Date(duration.toFixed(1) * 1000).toISOString().substr(14, 5)}</Badge>
                    </div>
                    <div className={styles.songLengthTime}>
                        <Badge pill variant="secondary" >{new Date(songLength.toFixed(1) * 1000).toISOString().substr(14, 5)}</Badge>
                    </div>
                </div>
                <Container fluid className={styles.playbarContainer}>
                    <SongControls className={styles.songControls} />
                    <div className={styles.songInfo}>
                        <SongInfo />
                    </div>

                    <Container className={styles.volumeControls}>
                        <div className={styles.volumeSlider}>
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
                        </div>
                    </Container>
                </Container>
            </Container>
        </>
    );
}
