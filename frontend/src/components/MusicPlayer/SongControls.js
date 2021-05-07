import React, { useState, useContext, useEffect } from "react";
import { Button, Container, OverlayTrigger, Tooltip } from "react-bootstrap";
import { FaStepBackward, FaPlay, FaPause, FaStepForward } from "react-icons/fa";
import { AppContext } from "../../AppContextProvider";
import styles from "./SongControls.module.css";
export default function SongControls() {
    const {
        currentRoom,
        playing,
        socket,
        voteSkip,
        setVoteSkip
    } = useContext(AppContext);

    const [playButtonText, setPlayButtonText] = useState(<FaPause />);

    function handleVoteSkip() {
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
                <Button variant="outline-light" size="lg" className={styles.playBtn} disabled>
                    {playButtonText}
                </Button>{" "}
                <OverlayTrigger placement="top" overlay={<Tooltip>Vote Skip</Tooltip>}>
                    <Button variant="dark" size="lg" className={styles.voteSkip} onClick={handleVoteSkip}>
                        <FaStepForward />
                    </Button>
                </OverlayTrigger>
            </Container>
        </>
    );
}
