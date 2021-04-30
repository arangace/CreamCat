import React from 'react';
import { useState } from 'react'
import axios from "axios";

const AppContext = React.createContext();

function AppContextProvider({ children }) {

    const [roomID, setRoomID] = useState();
    const [name, setName] = useState("");
    const [description, setDescription] = useState();
    const [playing, setPlaying] = useState(true);
    const [duration, setDuration] = useState(0);
    const [songLength, setSongLength] = useState(0);
    const [volume, setVolume] = useState(100);
    const [password, setPassword] = useState();
    const [userCount, setUserCount] = useState(1);
    const [ playlist, setPlaylist ] = useState([]);

    async function createRoom(room) {
        const response = await axios.post("http://localhost:3000/api/room/create/", room);
        setRoomID(response.data._id);
        setName(response.data.name);
        setDescription(response.data.description);
        setPassword(response.data.password);
    }

    async function joinRoom(room) {
        const response = await axios.post("http://localhost:3000/api/room/join/", room);
        if (response.data.name) {
            setRoomID(response.data._id);
            setName(response.data.name);
            setDescription(response.data.description);
            setPassword(response.data.password);
            return "forward";
        }
        else {
            return response.data;
        }
    }

    function handleplay() {
        setPlaying(!playing);
    }

    function handleSetDuration(value) {
        setDuration(value);
    }

    function handleSongLength(value) {
        setSongLength(value);
    }
    function handleVolume(value) {
        setVolume(value);
    }

    // The context value that will be supplied to any descendants of this component.
    const context = {
        roomID,
        setRoomID,
        name,
        description,
        playing,
        duration,
        songLength,
        volume,
        password,
        setPassword,
        userCount,
        setUserCount,
        playlist,
        setPlaylist,
        createRoom,
        joinRoom,
        handleplay,
        handleSetDuration,
        handleSongLength,
        handleVolume
    };

    // Wraps the given child components in a Provider for the above context.
    return (
        <AppContext.Provider value={context}>
            {children}
        </AppContext.Provider>
    );
}

export {
    AppContext,
    AppContextProvider
};