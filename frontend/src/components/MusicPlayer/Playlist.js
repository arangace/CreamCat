import { useContext } from "react";
import { AppContext } from "../../AppContextProvider";
import styles from "./Playlist.module.css";

export default function Playlist() {
    const { playlist } = useContext(AppContext);

    //placeholder playlist
    const tracks = [
        {
            track: 1,
            name: "All This Is - Joe L.'s Studio",
            duration: "2:46",
            file: "JLS_ATI",
        },
    ];

    // initialize playlist and controls

    function buildPlaylist() {
        if (playlist && playlist.length > 0) {
            return playlist.map((song, index) => {
                const trackNumber = (index + 1).toLocaleString("en-US", {
                    minimumIntegerDigits: 2,
                    useGrouping: false,
                });

                return (
                    <li>
                        <div className={styles.playlistItem}>
                            <span className={styles.songNumber}>
                                {trackNumber}
                            </span>
                            <span className={styles.songTitle}>
                                {song.title}
                            </span>
                            <span className={styles.songLength}>Duration</span>
                        </div>
                    </li>
                );
            });
        } else {
            console.log(`Playlist is empty`);
            return (
                <li>Don't you think it's a bit quiet..? Try adding a song!</li>
            );
        }
    }

    return (
        <>
            <div className={styles.container}>
                <div className={styles.column}>
                    <ul className={styles.playlist}>{buildPlaylist()}</ul>
                </div>
            </div>
        </>
    );
}
