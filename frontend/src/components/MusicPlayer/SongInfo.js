import { Card } from "react-bootstrap";
import styles from "./SongInfo.module.css";

export default function SongInfo() {
    // Needs state
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
