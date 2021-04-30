import "react-bootstrap";
import { io } from "socket.io-client";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../AppContextProvider";
import MusicPlayer from "./MusicPlayer";
import Player from "./MusicPlayer/Player";

export default function Room() {
    // TODO: add state for userCount in AppContext
    const {
        roomID,
        password,
        playlist,
        setPlaylist,
        setUserCount,
    } = useContext(AppContext);

    // TODO: Temporary state for socketResponse, should be replaced by AppContext
    const [socketResponse, setSocketResponse] = useState("");

    useEffect(() => {
        // Connect to socket on localhost server and pass roomId
        const socket = io({
            query: {
                roomID: roomID,
                password: password,
            },
        });
        socket.on("FromAPIOnConnect", (data) => {
            // Parse response into AppContext
            const { playlist, userCount } = data;
            setPlaylist(playlist);
            setUserCount(userCount);

            // TODO: change placeholder to set AppContext values
            setSocketResponse(data);
            // TEMPORARY: log socket response
            console.dir(socketResponse);
        });
    }, []);

    return (
        <>
            <div className="temp-gap"></div>
            <Player />
            <MusicPlayer />
        </>
    );
}
