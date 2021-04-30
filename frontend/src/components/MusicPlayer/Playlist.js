import { useState } from "react";
import styles from "./Playlist.module.css";

export default function Playlist() {
    //placeholder playlist
    const tracks = [
        {
            track: 1,
            name: "All This Is - Joe L.'s Studio",
            duration: "2:46",
            file: "JLS_ATI",
        }
    ];

    const [index, setIndex] = useState(0);
    const [extension, setExtension] = useState(0);
    const [statusText, setStatusText] = useState("Paused...");
    const [currentSongTitle, setCurrentSongTitle] = useState(tracks[0].name);
    const [playing, setPlaying] = useState(false);

    // initialize playlist and controls
    const trackCount = tracks.length;

    const changeStatusText = () => {
        // change playing status (if needed)
        setStatusText(playing ? "Now Playing" : "Paused");
    };

    const handlePlay = () => {
        // handle playing (unmuting) functionality here
    };
    const handlePause = () => {
        // handle pausing (muting) functionality here
    };
    const songEnd = () => {
        // handle play next song functionality here
    };

    const handlePrev = () => {
        // handle vote to reply song functionality here
    };

    const handleNext = () => {
        // add vote to skip song functionality here
    };

    const playTrack = (id) => {
        // add audio playing functionality here
    };

    const buildPlaylist = tracks.map((song, index) => {
        const trackNumber =
            song.track.toString().length === 1 ? "0" + song.track : song.track;
        return (
            <li>
                <div className={styles.playlistItem}>
                    <span className={styles.songNumber}>{trackNumber}</span>
                    <span className={styles.songTitle}>{song.name}</span>
                    <span className={styles.songLength}>{song.duration}</span>
                </div>
            </li>
        );
    });

    return (
        <>
            <div className={styles.container}>
                <div className={styles.column}>
                    <ul className={styles.playlist}>{buildPlaylist}</ul>
                </div>
            </div>
        </>
    );
}
