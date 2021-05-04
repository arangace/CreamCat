import { Card } from "react-bootstrap";
import React, { useContext } from "react";
import { AppContext } from '../../AppContextProvider';
import styles from "./Playbar.module.css";
export default function SongInfo() {

    const { currentSong } = useContext(AppContext);

    return (
        <Card bg="dark" text="light">
            <Card.Body className={styles.songInfoText}>
                <Card.Title >{currentSong ? currentSong.title : "No song in queue..."}</Card.Title>
                <Card.Subtitle className={styles.limitTextLength}>
                    {currentSong ? currentSong.content : "Try adding a song from the search bar!"}
                </Card.Subtitle>
            </Card.Body>
        </Card>
    );
}
