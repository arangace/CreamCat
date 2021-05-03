import React, { useState, useContext } from "react";
import { Button, ButtonGroup, Container } from "react-bootstrap";
import { FaStepBackward, FaPlay, FaPause, FaStepForward } from "react-icons/fa";
import { AppContext } from "../../AppContextProvider";
import styles from "./SongControls.module.css";
export default function SongControls() {
    // need context
    const { playing, setPlaying } = useContext(AppContext);
    const [playButtonText, setPlayButtonText] = useState(<FaPause />);

    const nextSong = () => { };

    const prevSong = () => { };

    function handlePlayPause() {
        if (playing) {
            setPlayButtonText(<FaPlay />);
        }
        else {
            setPlayButtonText(<FaPause />);
        }
        setPlaying(!playing);
    }

    return (
        <>

            <Container className={styles.songControls}>
                <Button className={styles.prevSong} onClick={prevSong}>
                    <FaStepBackward />
                </Button>{' '}
                <Button
                    className={styles.playBtn}
                    onClick={handlePlayPause}
                >
                    {playButtonText}
                </Button>{' '}
                <Button className={styles.nextSong} onClick={nextSong}>
                    <FaStepForward />
                </Button>
            </Container>
        </>
    );
}
