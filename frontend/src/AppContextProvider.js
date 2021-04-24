import React from 'react';
import {useState} from 'react'
import axios from "axios";

const AppContext = React.createContext();

function AppContextProvider({ children }) {

    const [roomID, setRoomID] = useState();
    const [name, setName] = useState("");
    const [description, setDescription] = useState();


    async function createRoom(room){
        const response = await axios.post("http://localhost:3000/api/room/create/", room);
        setRoomID(response.data._id);
        setName(response.data.name);
        setDescription(response.data.description);
    }

    async function joinRoom(room){
        const response = await axios.post("http://localhost:3000/api/room/join/", room);
        if(response.data.name){
            setRoomID(response.data._id);
            setName(response.data.name);
            setDescription(response.data.description);
            return "forward";
        }
        else{
            return response.data;
        }
    }





    // The context value that will be supplied to any descendants of this component.
    const context = {
        roomID,
        name,
        description,
        createRoom,
        joinRoom
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