import Header from "./Header";
import Playbar from "./Playbar";
import Playlist from "./Playlist";
import styles from "./Header.module.css";
export default function MusicPlayer() {
    return (
        <>
            <Header />
            <div className={styles.navPlaceholder}></div>
            <Playlist />
            <Playbar />
        </>
    );
}
