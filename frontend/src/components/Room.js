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
        setUserCount,
        setVersion,
        setSocket,
        setKey,
        resetVoteState,
        setVotingFor,
        setElapsedTime,
        setLatency,
        currentSong
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
                console.log(response);
                voteCallback(response);
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

            socket.on("Vote passed", (song) => {
                socket.emit("Song ended", song);
            });

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

            function voteCallback(response) {
                const { action, voteType, voteCount } = response;
                switch (action) {
                    case "start":
                        // display voting status alert
                        // display pass condition
                        setVotingFor((vf) => {
                            const votingFor = {...vf};
                            votingFor[voteType] = voteCount;
                            console.log(votingFor)
                            return votingFor;
                        });
                        break;
                    case "update":
                        // update voting status alert
                        setVotingFor((vf) => {
                            const votingFor = {...vf};
                            votingFor[voteType] = voteCount;
                            console.log(votingFor);
                            return votingFor;
                        });
                        break;
                    case "fail":
                        // remove voting status alert
                        // reset all states to default
                        resetVoteState(voteType);
                        setVotingFor((vf) => {
                            const votingFor = {...vf};
                            delete votingFor[voteType];
                            console.log(votingFor);
                            return votingFor;
                        });
                        break;
                    case "passed":
                        // current song deleted from database, display passed alert, refetch playlist and play new song
                        // could implement a countdown
                        // reset all states to default
                        resetVoteState(voteType);
                        setVotingFor((vf) => {
                            const votingFor = {...vf};
                            delete votingFor[voteType];
                            console.log(votingFor);
                            return votingFor;
                        });
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
                <div className="musicPlayer-dark-mode">
                </div>
                <div className="dark-mode">

                    <MusicPlayer />

                </div>

            </>
        );
    }
}
