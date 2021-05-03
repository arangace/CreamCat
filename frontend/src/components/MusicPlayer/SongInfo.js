import { Card } from "react-bootstrap";
import React, { useContext } from "react";
import styles from "./SongInfo.module.css";
import { AppContext } from '../../AppContextProvider';
export default function SongInfo() {
    
    const { currentSong } = useContext(AppContext);

    return (
        <Card className={styles.songInfo} bg="dark" text="light">
            <Card.Body>
                <Card.Title>{currentSong? currentSong.title: "No song in queue..."}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                    {currentSong? currentSong.content: "Try adding a song from the search bar!"}
                </Card.Subtitle>
            </Card.Body>
        </Card>
    );
}
