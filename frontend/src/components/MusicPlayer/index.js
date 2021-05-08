import Header from "./Header";
import Playbar from "./Playbar";
import Playlist from "./Playlist";
import styles from "./Header.module.css";
import { Alert } from "react-bootstrap";
import { useContext } from "react";
import { AppContext } from "../../AppContextProvider";

export default function MusicPlayer() {
    const { votingFor, userCount, getVoteState, displayNoCurrentSongAlert } = useContext(
        AppContext
    );

    function VoteDisplay() {
        const voteTypes = Object.keys(votingFor);
        if (voteTypes.length > 0) {
            return voteTypes.map((voteType, index) => {
                const voteCount = votingFor[voteType];
                return (
                    <div className={styles.voteOverlay}>
                        <Alert variant="dark">
                            <Alert.Heading>
                                Vote {voteType}: {voteCount}/{userCount}
                            </Alert.Heading>
                            <p>
                                {getVoteState(voteType)
                                    ? "You have voted yes."
                                    : "You have not voted."}
                            </p>
                        </Alert>
                    </div>
                );
            });
        } else {
            return null;
        }
    }
    function NoCurrentSongAlert() {
        if (displayNoCurrentSongAlert) {
            return (
                <div className={styles.voteOverlay}>
                    <Alert variant="dark">
                        <Alert.Heading>
                            Please add a song before starting a vote.
                    </Alert.Heading>
                    </Alert>
                </div>
            );
        } else {
            return null;
        }
    }

    return (
        <>
            <Header />
            <div className={styles.navPlaceholder}></div>
            <VoteDisplay />
            <NoCurrentSongAlert />
            <Playlist />
            <Playbar />
        </>
    );
}
