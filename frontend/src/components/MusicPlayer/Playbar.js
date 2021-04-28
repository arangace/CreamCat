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
    const { duration, songLength } = useContext(AppContext);
    function updateTextInput(val) {
        console.log(val);
    }

    return (

        <>
            <Container fluid className={styles.playbar}>
                <ProgressBar now={duration} min="0" max={songLength} />
                <Container fluid className={styles.playbarContainer}>
                    <SongInfo className={styles.songInfo} />

                    <SongControls className={styles.songControls} />

                    <Container className={styles.volumeControls}>
                        <input id="textInput" type="range" min="0" max="100" className={styles.volumeSlider} onchange={e => (updateTextInput(e))} />
                    </Container>
                </Container>
            </Container>
        </>
    );
}
