import React, { useState, useContext, useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import { FaStepBackward, FaPlay, FaPause, FaStepForward } from "react-icons/fa";
import { AppContext } from "../../AppContextProvider";
import styles from "./SongControls.module.css";
export default function SongControls() {
    const {
        currentRoom,
        playing,
        setPlaying,
        currentSong,
        socket,
        voteSkip,
        setVoteSkip
    } = useContext(AppContext);

    const [playButtonText, setPlayButtonText] = useState(<FaPause />);

    function handleVoteSkip () {
        const vote = !voteSkip;
        console.log(`voteSkip set to ${vote}`)
        setVoteSkip(v => !v);
        const payload = {
            roomID: currentRoom._id,
            password: currentRoom.password,
            voteType: "skip",
            vote: vote,
        };
       socket.emit("Vote", payload);
    };

    const prevSong = () => {};

    function handlePlayPause() {
        if (currentSong) {
            setPlaying(!playing);
        }
    }

    useEffect(() => {
        if (playing) {
            setPlayButtonText(<FaPause />);
        } else {
            setPlayButtonText(<FaPlay />);
        }
    }, [playing]);

    return (
        <>
            <Container className={styles.songControls}>
                <Button className={styles.prevSong} onClick={prevSong}>
                    <FaStepBackward />
                </Button>{" "}
                <Button className={styles.playBtn} onClick={handlePlayPause}>
                    {playButtonText}
                </Button>{" "}
                <Button className={styles.voteSkip} onClick={handleVoteSkip}>
                    <FaStepForward />
                </Button>
            </Container>
        </>
    );
}
