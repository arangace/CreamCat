import React, { useState, useContext } from "react";
import { Button, ButtonGroup, Container } from "react-bootstrap";
import { FaStepBackward, FaPlay, FaPause, FaStepForward } from "react-icons/fa";
import { AppContext } from '../../AppContextProvider';
import styles from "./SongControls.module.css";
export default function SongControls() {
    // need context
    const { playing, handleplay } = useContext(AppContext);
    const [playButtonText, setPlayButtonText] = useState(FaPlay);

    const nextSong = () => { };

    const prevSong = () => { };
    function PlayButton() {
        if (playing) {
            setPlayButtonText(FaPlay);
        }
        else {
            setPlayButtonText(FaPause);
        }
        handleplay(!playing);
    }

    return (
        <>

            <Container className={styles.songControls}>
                <Button className={styles.prevSong} onClick={prevSong}>
                    <FaStepBackward />
                </Button>{' '}
                <Button
                    className={styles.playBtn}
                    onClick={PlayButton}
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
