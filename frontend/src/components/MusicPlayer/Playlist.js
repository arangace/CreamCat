import { useState, useContext, useEffect } from "react";
import { AppContext } from "../../AppContextProvider";
import styles from "./Playlist.module.css";
import axios from 'axios'

export default function Playlist() {
    //placeholder playlist
    const { roomID, password, playlist, setPlaylist } = useContext(AppContext);

    const room = {
        roomid: roomID,
        password: password
    }

    const [version, setVersion] = useState(false);


    useEffect(() => {
        async function fetchData() {
            const response = await axios.post("http://localhost:3000/api/playlist/getall/", room);
            if (response.data.length > 0) {
                const songs = response.data;
                console.log(songs);
                setPlaylist(songs);
            }
            else {
                setPlaylist([]);
            }
        }
        fetchData();
    }, [version]);


    function buildPlaylist() {
        if (playlist && playlist.length > 0) {
            console.log(`Playlist contains ${playlist.length} songs`);
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
