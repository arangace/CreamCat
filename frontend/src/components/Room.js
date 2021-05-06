import "react-bootstrap";
import { io } from "socket.io-client";
import { useContext, useEffect } from "react";
import { AppContext } from "../AppContextProvider";
import MusicPlayer from "./MusicPlayer";
import dayjs from "dayjs";
import { useHistory } from "react-router";

export default function Room() {
    // TODO: add state for userCount in AppContext
    const {
        currentRoom,
        currentSong,
        setUserCount,
        setVersion,
        setSocket,
        setKey,
        setVoteSkip,
        setVoteCount,
        setVoting,
        setElapsedTime,
        setLatency,
    } = useContext(AppContext);

    const history = useHistory();

    useEffect(() => {
        if (!currentRoom) {
            history.replace(`/RoomPage`);
        } else {
            // Connect to socket on localhost server and pass roomId
            const socket = io({
                query: {
                    roomID: currentRoom._id,
                    password: currentRoom.password,
                },
            });

            // Update latency every 2 seconds
            //ping(2000);

            socket.on("Connected", () => {
                console.log(`connected`);
                setSocket(socket);
            });
            socket.on("Update userCount", (userCount) => {
                console.log(`User count updated -> ${userCount}`);
                setUserCount(userCount);
            });
            socket.on("Add song", () => addSongCallback());

            socket.on("Refetch", () => {
                console.log(`Refetch called by API`);
                setVersion((v) => !v);
                setKey((k) => k + 1);
            });

            socket.on("Vote", (response) => {
                const { action, voteType, voteCount, songID } = response;
                console.log(response);
                switch (voteType) {
                    case "skip":
                        voteSkipCallback(action, voteCount, songID);
                        break;
                    case "play":
                        //votePlayCallback(action, voteCount, songID);
                        break;
                    case "pause":
                        //votePauseCallback(action, voteCount, songID);
                        break;
                    default:
                        console.log(`Unhandled voteType received: ${voteType}`);
                }
            });

            socket.on(
                "Synchronize elapsedTime",
                ({ elapsedTime, emitTime }) => {
                    // Change this value to decrease/increase buffer
                    setElapsedTime(
                        elapsedTime === 0
                            ? 0
                            : elapsedTime +
                                  dayjs().diff(emitTime, "milliseconds") / 1000
                    );
                    console.log(
                        `Receiving elapsed time: ${
                            elapsedTime +
                            dayjs().diff(emitTime, "milliseconds") / 1000
                        }`
                    );
                }
            );

            function ping(pingInterval) {
                let pingStart;
                setInterval(() => {
                    pingStart = dayjs();
                    socket.emit("Ping");
                }, pingInterval);

                socket.on("Pong", () => {
                    const latency = dayjs().diff(pingStart, "milliseconds") / 2;
                    console.log(latency);
                    setLatency(latency);
                });
            }

            function voteSkipCallback(action, voteCount) {
                switch (action) {
                    case "start":
                        // display voting status alert
                        // display pass condition
                        setVoteCount(voteCount);
                        setVoteSkip(true);
                        setVoting(true);

                        break;
                    case "update":
                        // update voting status alert
                        setVoteCount(voteCount);
                        setVoteSkip(true);
                        setVoting(true);
                        break;
                    case "fail":
                        // remove voting status alert
                        // reset all states to default
                        setVoting(false);
                        setVoteSkip(false);
                        setVoteCount(0);
                        break;
                    case "passed":
                        // current song deleted from database, display passed alert, refetch playlist and play new song
                        // could implement a countdown
                        // reset all states to default
                        socket.emit("Song ended", currentSong);
                        setVoting(false);
                        setVoteSkip(false);
                        setVoteCount(0);
                        break;
                    default:
                }
                // display vote alert
                // maybe highlight skip button
            }
        }
    }, []);

    function addSongCallback() {
        console.log(`New song message received from socket...`);

        setVersion((v) => !v);
    }

    if (!currentRoom) {
        history.replace(`/RoomPage`);
        return null;
    } else {
        return (
            <>
                <div className="temp-gap"></div>
                <MusicPlayer />
            </>
        );
    }
}
