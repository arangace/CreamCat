import React, { useState } from "react";
import axios from "axios";

const AppContext = React.createContext();

function AppContextProvider({ children }) {
    const [currentRoom, setCurrentRoom] = useState(
        JSON.parse(localStorage.getItem("currentRoom"))
    );

    const [userCount, setUserCount] = useState(0);

    const [playlist, setPlaylist] = useState([]);
    const [playing, setPlaying] = useState(true);
    const [currentSong, setCurrentSong] = useState();

    const [version, setVersion] = useState(false);
    const [socket, setSocket] = useState();
    const [key, setKey] = useState(0);

    async function createRoom(room) {
        const response = await axios.post(
            "http://localhost:3000/api/room/create/",
            room
        );

        console.log(`Creating room...`);
        localStorage.setItem("currentRoom", JSON.stringify(response.data));
        setCurrentRoom(JSON.parse(localStorage.getItem("currentRoom")));
    }

    async function joinRoom(room) {
        const response = await axios.post(
            "http://localhost:3000/api/room/join/",
            room
        );
        console.log(`Joining room...`);
        if (response.data.name) {
            localStorage.setItem("currentRoom", JSON.stringify(response.data));
            setCurrentRoom(JSON.parse(localStorage.getItem("currentRoom")));

            return "forward";
        } else {
            return response.data;
        }
    }

    // The context value that will be supplied to any descendants of this component.
    const context = {
        currentRoom,
        setCurrentRoom,
        userCount,
        setUserCount,
        playlist,
        setPlaylist,
        createRoom,
        joinRoom,
        version,
        setVersion,
        socket,
        setSocket,
        currentSong,
        setCurrentSong,
        key,
        setKey,
        playing,
        setPlaying,
    };

    // Wraps the given child components in a Provider for the above context.
    return (
        <AppContext.Provider value={context}>{children}</AppContext.Provider>
    );
}

export { AppContext, AppContextProvider };
