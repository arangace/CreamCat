import React, { useState, useContext } from "react";
import { Button, ButtonGroup, Container } from "react-bootstrap";
import styles from "./SongControls.module.css";

export default function SongControls() {
    // need context
    const [playing, setPlaying] = useState(false);
    const [playButtonText, setPlayButtonText] = useState("Play");
    const [elapsedTime, setElapsedTime] = useState("");
    const songs = [];
    const songDetails = [];
    const songName = "Song Title";
    const artistName = "Artist Name";

    const nextSong = () => {};

    const prevSong = () => {};

    const pauseSong = () => {
        setPlayButtonText("Play");
        setPlaying(!playing);
    };

    const resumeSong = () => {
        setPlayButtonText("Pause");
        setPlaying(!playing);
    };

    const elapsedTimeDisplay = () => {
        return "elapsed time";
    };

    const remainingTimeDisplay = () => {
        return "remaining rime";
    };

    // replace with useEffect?
    const calculateTime = () => {
        const intervalId = setInterval(() => {
            if (elapsedTime === 30) {
                //hook to stop song
            } else if (!playing) {
                setElapsedTime(elapsedTime + 1);
            }
        }, 1000);

        this.setState({
            intervalId: intervalId,
        });
    };

    const getSongIndex = () => {
        const currentIndex = songs
            .map((song, index) => {
                if (song.track === songDetails) {
                    return index;
                } else {
                    return undefined;
                }
            })
            .filter((item) => {
                return item !== undefined;
            })[0];
        return currentIndex;
    };

    return (
        <Container className={styles.songControls}>
                <Button className={styles.prevSong} onClick={prevSong}>
                    Prev
                </Button>
                <Button
                    className={styles.playBtn}
                    onClick={playing ? pauseSong : resumeSong}
                >
                    {playButtonText}
                </Button>
                <Button className={styles.nextSong} onClick={nextSong}>
                    Next
                </Button>
        </Container>
    );
}
