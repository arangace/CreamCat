import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import { io } from 'socket.io-client';
import { AppContext } from './AppContextProvider';


const RoomContext = React.createContext();

function RoomContextProvider({ children }) {
    const { roomID, password} = useContext(AppContext);
    const [socket, setSocket] = useState();
    const [version, setVersion] = useState();
    let version1 = false;

    useEffect(() => {
        function connection() {
        const socket1 = io({query: { roomID, password}});
        setSocket(socket1);
        console.log("###");
        socket1.on('update', () => update());
        }
        connection();
    }, []);

    function update() { 
        console.log(version);
        version1 = !version1;
        console.log(version1);
        setVersion(version1);
    }
    console.log("123");

    // The context value that will be supplied to any descendants of this component.
    const context = {
        socket,
        version
    };

    // Wraps the given child components in a Provider for the above context.
    return (
        <RoomContext.Provider value={context}>
            {children}
        </RoomContext.Provider>
    );
}

export {
    RoomContext,
    RoomContextProvider
};