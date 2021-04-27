import {
    Container,
    ProgressBar
} from "react-bootstrap";
import styles from "./Playbar.module.css";
import SongControls from "./SongControls";
import SongInfo from "./SongInfo";

export default function Playbar() {
    return (
        <>
            <Container fluid className={styles.playbar}>
            <ProgressBar now={60} />
                <Container fluid className={styles.playbarContainer}>
                    <SongInfo className={styles.songInfo} />

                    <SongControls className={styles.songControls} />

                    <Container className={styles.volumeControls}>
                        <input type="range" className={styles.volumeSlider}/>
                    </Container>
                </Container>
            </Container>
        </>
    );
}
