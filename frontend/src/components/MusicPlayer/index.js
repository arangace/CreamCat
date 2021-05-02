import Header from "./Header";
import Playbar from "./Playbar";
import Playlist from "./Playlist";
import styles from "./Header.module.css";
import { PlayerContextProvider } from "../../PlayerContextProvider";
export default function MusicPlayer() {
    return (
        <>
            <Header />
            <div className={styles.navPlaceholder}></div>
            <Playlist />
            <PlayerContextProvider>
                <Playbar />
            </PlayerContextProvider>
        </>
    );
}
