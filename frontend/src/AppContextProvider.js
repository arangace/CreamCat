import React, { useState, useEffect } from 'react';
import axios from "axios";

const AppContext = React.createContext();

function AppContextProvider({ children }) {

    const [roomID, setRoomID] = useState(localStorage.getItem("roomID"));
    const [roomName, setRoomName] = useState("");
    const [roomDesc, setRoomDesc] = useState();
    const [userCount, setUserCount] = useState(0);
    const [playlist, setPlaylist] = useState([]);
    const [version, setVersion] = useState(false);
    const [password, setPassword] = useState(localStorage.getItem("password"));

    async function createRoom(room) {
        const response = await axios.post(
            "http://localhost:3000/api/room/create/",
            room
        );
        setRoomID(response.data._id);
        setRoomName(response.data.name);
        setRoomDesc(response.data.description);
        setPassword(response.data.password);
        localStorage.setItem("name", response.data.name)
        localStorage.setItem("roomID", response.data._id)
        localStorage.setItem("password", response.data.password)
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
            localStorage.setItem("name", response.data.name)
            localStorage.setItem("roomID", response.data._id)
            localStorage.setItem("password", response.data.password)
            return "forward";
        } else {
            return response.data;
        }
    }


    useEffect(() => {
        function setData(){
            setRoomName(localStorage.getItem("name"))
            setRoomID(localStorage.getItem("roomID"))
            setPassword(localStorage.getItem("password"))
        
        }
    setData();
    }, [roomID, password]);


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
