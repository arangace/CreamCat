import {
    Container,
    ProgressBar
} from "react-bootstrap";
import styles from "./Playbar.module.css";
import SongControls from "./SongControls";
import SongInfo from "./SongInfo";
import { useContext } from 'react';
import { AppContext } from '../../AppContextProvider';
export default function Playbar() {
    const { duration, songLength, handleVolume, volume } = useContext(AppContext);

    return (

        <>
            <Container fluid className={styles.playbar}>
                <ProgressBar now={duration} min="0" max={songLength} />
                <Container fluid className={styles.playbarContainer}>
                    <SongInfo className={styles.songInfo} />

                    <SongControls className={styles.songControls} />

                    <Container className={styles.volumeControls}>
                        <input
                            type="range"
                            min={0}
                            max={1}
                            step={0.02}
                            value={volume}
                            onChange={event => {
                                handleVolume(event.target.valueAsNumber)
                            }}
                        />
                    </Container>

                </Container>
            </Container>
        </>
    );
}
