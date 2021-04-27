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
        },
        {
            track: 2,
            name: "The Forsaken - Broadwing Studio (Final Mix)",
            duration: "8:30",
            file: "BS_TF",
        },
        {
            track: 3,
            name: "All The King's Men - Broadwing Studio (Final Mix)",
            duration: "5:01",
            file: "BS_ATKM",
        },
        {
            track: 4,
            name: "The Forsaken - Broadwing Studio (First Mix)",
            duration: "8:31",
            file: "BSFM_TF",
        },
        {
            track: 5,
            name: "All The King's Men - Broadwing Studio (First Mix)",
            duration: "5:05",
            file: "BSFM_ATKM",
        },
        {
            track: 6,
            name: "All This Is - Alternate Cuts",
            duration: "2:48",
            file: "AC_ATI",
        },
        {
            track: 7,
            name: "All The King's Men (Take 1) - Alternate Cuts",
            duration: "5:44",
            file: "AC_ATKMTake_1",
        },
        {
            track: 8,
            name: "All The King's Men (Take 2) - Alternate Cuts",
            duration: "5:26",
            file: "AC_ATKMTake_2",
        },
        {
            track: 9,
            name: "Magus - Alternate Cuts",
            duration: "5:46",
            file: "AC_M",
        },
        {
            track: 10,
            name: "The State Of Wearing Address (fucked up) - Alternate Cuts",
            duration: "5:25",
            file: "AC_TSOWAfucked_up",
        },
        {
            track: 11,
            name: "Magus - Popeye's (New Years '04 - '05)",
            duration: "5:53",
            file: "PNY04-05_M",
        },
        {
            track: 12,
            name: "On The Waterfront - Popeye's (New Years '04 - '05)",
            duration: "4:40",
            file: "PNY04-05_OTW",
        },
        {
            track: 13,
            name: "Trance - Popeye's (New Years '04 - '05)",
            duration: "13:15",
            file: "PNY04-05_T",
        },
        {
            track: 14,
            name: "The Forsaken - Popeye's (New Years '04 - '05)",
            duration: "8:12",
            file: "PNY04-05_TF",
        },
        {
            track: 15,
            name:
                "The State Of Wearing Address - Popeye's (New Years '04 - '05)",
            duration: "7:02",
            file: "PNY04-05_TSOWA",
        },
        {
            track: 16,
            name: "Magus - Popeye's (Valentine's Day '05)",
            duration: "5:43",
            file: "PVD_M",
        },
        {
            track: 17,
            name: "Trance - Popeye's (Valentine's Day '05)",
            duration: "10:45",
            file: "PVD_T",
        },
        {
            track: 18,
            name:
                "The State Of Wearing Address - Popeye's (Valentine's Day '05)",
            duration: "5:36",
            file: "PVD_TSOWA",
        },
        {
            track: 19,
            name: "All This Is - Smith St. Basement (01/08/04)",
            duration: "2:48",
            file: "SSB01_08_04_ATI",
        },
        {
            track: 20,
            name: "Magus - Smith St. Basement (01/08/04)",
            duration: "5:46",
            file: "SSB01_08_04_M",
        },
        {
            track: 21,
            name: "Beneath The Painted Eye - Smith St. Basement (06/06/03)",
            duration: "13:07",
            file: "SSB06_06_03_BTPE",
        },
        {
            track: 22,
            name: "Innocence - Smith St. Basement (06/06/03)",
            duration: "5:16",
            file: "SSB06_06_03_I",
        },
        {
            track: 23,
            name: "Magus - Smith St. Basement (06/06/03)",
            duration: "5:46",
            file: "SSB06_06_03_M",
        },
        {
            track: 24,
            name: "Madness Explored - Smith St. Basement (06/06/03)",
            duration: "4:51",
            file: "SSB06_06_03_ME",
        },
        {
            track: 25,
            name: "The Forsaken - Smith St. Basement (06/06/03)",
            duration: "8:43",
            file: "SSB06_06_03_TF",
        },
        {
            track: 26,
            name: "All This Is - Smith St. Basement (12/28/03)",
            duration: "3:00",
            file: "SSB12_28_03_ATI",
        },
        {
            track: 27,
            name: "Magus - Smith St. Basement (12/28/03)",
            duration: "6:09",
            file: "SSB12_28_03_M",
        },
        {
            track: 28,
            name: "Madness Explored - Smith St. Basement (12/28/03)",
            duration: "5:05",
            file: "SSB12_28_03_ME",
        },
        {
            track: 29,
            name: "Trance - Smith St. Basement (12/28/03)",
            duration: "12:32",
            file: "SSB12_28_03_T",
        },
        {
            track: 30,
            name: "The Forsaken - Smith St. Basement (12/28/03)",
            duration: "8:56",
            file: "SSB12_28_03_TF",
        },
        {
            track: 31,
            name: "All This Is (Take 1) - Smith St. Basement (Nov. '03)",
            duration: "4:55",
            file: "SSB___11_03_ATITake_1",
        },
        {
            track: 32,
            name: "All This Is (Take 2) - Smith St. Basement (Nov. '03)",
            duration: "5:45",
            file: "SSB___11_03_ATITake_2",
        },
        {
            track: 33,
            name:
                "Beneath The Painted Eye (Take 1) - Smith St. Basement (Nov. '03)",
            duration: "14:05",
            file: "SSB___11_03_BTPETake_1",
        },
        {
            track: 34,
            name:
                "Beneath The Painted Eye (Take 2) - Smith St. Basement (Nov. '03)",
            duration: "13:25",
            file: "SSB___11_03_BTPETake_2",
        },
        {
            track: 35,
            name: "The Forsaken (Take 1) - Smith St. Basement (Nov. '03)",
            duration: "8:37",
            file: "SSB___11_03_TFTake_1",
        },
        {
            track: 36,
            name: "The Forsaken (Take 2) - Smith St. Basement (Nov. '03)",
            duration: "8:36",
            file: "SSB___11_03_TFTake_2",
        },
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
