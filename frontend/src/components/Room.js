import "react-bootstrap";
import { io } from "socket.io-client";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../AppContextProvider";
import MusicPlayer from "./MusicPlayer";

export default function Room() {
    // TODO: add state for userCount in AppContext
    const {
        roomID,
        password,
        playlist,
        setPlaylist,
        setUserCount,
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
        socket.on("FromAPI on addSong", (newSong) => {
            console.log(playlist)
            const newPlaylist = {...playlist, newSong};
            console.log(newPlaylist);
            setPlaylist(newPlaylist);
        });
    }, []);

    return (
        <>
            <div className="temp-gap"></div>
            <MusicPlayer />
        </>
    );
}
