import React, { useState, useRef } from 'react';
import axios from "axios";

const AppContext = React.createContext();

function AppContextProvider({ children }) {
    const [roomID, setRoomID] = useState(localStorage.getItem("roomID"));
    const [roomName, setRoomName] = useState(localStorage.getItem("roomName"));
    const [roomDesc, setRoomDesc] = useState();
    const [password, setPassword] = useState(localStorage.getItem("password"));
    const [userCount, setUserCount] = useState(0);
    const [playlist, setPlaylist] = useState([]);
    const [version, setVersion] = useState(false);
    const [socket, setSocket] = useState();
    const [currentSong, setCurrentSong] = useState();
    const versionRef = useRef(version);

    async function createRoom(room) {
        const response = await axios.post(
            "http://localhost:3000/api/room/create/",
            room
        );

        console.log(`Creating room...`)
        localStorage.setItem("roomID", response.data._id);
        localStorage.setItem("roomName", response.data.name);
        localStorage.setItem("password", response.data.password);
        setRoomID(localStorage.getItem("roomID"));
        setRoomName(localStorage.getItem("roomName"));
        setRoomDesc(response.data.description);
        setPassword(localStorage.getItem("password"));
    }
    
    async function joinRoom(room) {
        const response = await axios.post(
            "http://localhost:3000/api/room/join/",
            room
        );
        console.log(`Joining room...`)
        if (response.data.name) {
            localStorage.setItem("roomID", response.data._id);
            localStorage.setItem("roomName", response.data.name);
            localStorage.setItem("password", response.data.password);
            console.log(`[localStorage updated] room=${localStorage.getItem("roomName")}, pw=${localStorage.getItem("password")}, ID=${localStorage.getItem("roomID")}\n `);
            setRoomID(localStorage.getItem("roomID"));
            setRoomName(localStorage.getItem("roomName"));
            setRoomDesc(response.data.description);
            setPassword(localStorage.getItem("password"));   

            return "forward";
        } else {
            return response.data;
        }
    }


    // The context value that will be supplied to any descendants of this component.
    const context = {
        roomID,
        setRoomID,
        roomName,
        roomDesc,
        password,
        setPassword,
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
        versionRef
    };

    // Wraps the given child components in a Provider for the above context.
    return (
        <AppContext.Provider value={context}>{children}</AppContext.Provider>
    );
}

export { AppContext, AppContextProvider };
