import React from 'react';
import {useState} from 'react'

const AppContext = React.createContext();

function AppContextProvider({ children }) {

    const [roomID, setRoomID] = useState();
    const [name, setName] = useState("");
    // The context value that will be supplied to any descendants of this component.
    const context = {
        roomID,
        setRoomID,
        name,
        setName
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