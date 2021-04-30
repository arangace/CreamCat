import { Card } from "react-bootstrap";
import React, { useContext } from "react";
import styles from "./SongInfo.module.css";
import { AppContext } from '../../AppContextProvider';
export default function SongInfo() {
    // Needs state
    const { track } = useContext(AppContext);
    const songTitle = "Song Title";
    const artistName = "Artist Name";

    ////

    return (
        <Card className={styles.songInfo} bg="dark" text="light">
            <Card.Body>
                <Card.Title>{songTitle}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                    {artistName}
                </Card.Subtitle>
            </Card.Body>
        </Card>
    );
}
