import React from "react";
import { useState } from "react";
import axios from "axios";

const AppContext = React.createContext();

function AppContextProvider({ children }) {
    const [roomID, setRoomID] = useState();
    const [roomName, setRoomName] = useState("");
    const [roomDesc, setRoomDesc] = useState();
    const [password, setPassword] = useState();
    const [userCount, setUserCount] = useState(0);
    const [playlist, setPlaylist] = useState([]);
    const [socket, setSocket] = useState();
    const [version, setVersion] = useState(false);

    async function createRoom(room) {
        const response = await axios.post(
            "http://localhost:3000/api/room/create/",
            room
        );
        setRoomName(response.data._id);
        setRoomName(response.data.name);
        setRoomDesc(response.data.description);
        setPassword(response.data.password);
    }

    async function joinRoom(room) {
        const response = await axios.post(
            "http://localhost:3000/api/room/join/",
            room
        );
        if (response.data.name) {
            setRoomID(response.data._id);
            setRoomName(response.data.name);
            setRoomDesc(response.data.description);
            setPassword(response.data.password);
            return "forward";
        } else {
            return response.data;
        }
    }

    // The context value that will be supplied to any descendants of this component.
    const context = {
        roomID,
        setRoomID,
        password,
        setPassword,
        userCount,
        setUserCount,
        playlist,
        setPlaylist,
        socket,
        setSocket,
        createRoom,
        joinRoom,
        version,
        setVersion,
    };

    // Wraps the given child components in a Provider for the above context.
    return (
        <AppContext.Provider value={context}>{children}</AppContext.Provider>
    );
}

export { AppContext, AppContextProvider };
