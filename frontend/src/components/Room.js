import "react-bootstrap";
import { io } from "socket.io-client";
import { useContext, useEffect } from "react";
import { AppContext } from "../AppContextProvider";
import MusicPlayer from "./MusicPlayer";

export default function Room() {
    // TODO: add state for userCount in AppContext
    const {
        roomID,
        password,
        setUserCount,
        setVersion
    } = useContext(AppContext);

    useEffect(() => {
        // Connect to socket on localhost server and pass roomId
        const socket = io({
            query: {
                roomID: roomID,
                password: password,
            },
        });
        socket.on("FromAPI on connect", (data) => {
            // Parse response into AppContext
            const { userCount } = data;
            setUserCount(userCount);
        });
        socket.on("FromAPI on addSong", () => addSongCallback());
    }, []);

    let version = false;
    function addSongCallback(){
        console.log(`New song message received from socket...`);
            // console.log(`room.js version is ${version}`);
            version = !version;
            setVersion( version );
            //console.log(`room.js version is changed to ${version}`);
            console.log(`new version is ${version}`);
    }

    return (
        <>
            <div className="temp-gap"></div>
            <MusicPlayer />
        </>
    );
}
