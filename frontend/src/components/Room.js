import "react-bootstrap";
import { io } from "socket.io-client";
import { useContext, useEffect } from "react";
import { AppContext } from "../AppContextProvider";
import MusicPlayer from "./MusicPlayer";
import dayjs from "dayjs";

export default function Room() {
    // TODO: add state for userCount in AppContext
    const {
        currentRoom,
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

    useEffect(() => {
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

        socket.on("Vote", (response) => voteCallback(response));

        socket.on("Synchronize elapsedTime", ({ elapsedTime, emitTime }) => {
            // Change this value to decrease/increase buffer
            setElapsedTime(
                elapsedTime === 0 ? 0 : (elapsedTime + dayjs().diff(emitTime, "milliseconds")/1000)
            );
            console.log(`Receiving elapsed time: ${elapsedTime + dayjs().diff(emitTime, "milliseconds")/1000}`);
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
    }, []);

    function addSongCallback() {
        console.log(`New song message received from socket...`);
        setVersion((v) => !v);
    }

    function voteCallback(response) {
        // action: start, update, passed, fail
        // voteType: skip, play, pause
        const { action, voteType, voteCount } = response;
        console.log(response);
        switch (action) {
            case "start":
                // display voting status alert
                // display pass condition
                switch (voteType) {
                    case "skip":
                        setVoteCount(voteCount);
                        setVoting(true);
                    default:
                }

                break;
            case "update":
                // update voting status alert
                setVoteCount(voteCount);
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
                setVoting(false);
                setVoteSkip(false);
                setVoteCount(0);
                break;
            default:
        }
        // display vote alert
        // maybe highlight skip button
    }

    return (
        <>
            <div className="temp-gap"></div>
            <MusicPlayer />
        </>
    );
}
