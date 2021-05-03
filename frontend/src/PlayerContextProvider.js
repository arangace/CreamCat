import React from 'react';
import { useState } from 'react'

const PlayerContext = React.createContext();

function PlayerContextProvider({ children }) {

    const [name, setName] = useState("");
    const [description, setDescription] = useState();
    const [playing, setPlaying] = useState(true);
    const [duration, setDuration] = useState(0);
    const [songLength, setSongLength] = useState(0);
    const [volume, setVolume] = useState(100);
    const [key, setKey] = useState(0);
    
    // The context value that will be supplied to any descendants of this component.
    const context = {
        name,
        setName,
        description,
        setDescription,
        playing,
        setPlaying,
        duration,
        setDuration,
        songLength,
        setSongLength,
        volume,
        setVolume,
        key,
        setKey
    };

    // Wraps the given child components in a Provider for the above context.
    return (
        <PlayerContext.Provider value={context}>
            {children}
        </PlayerContext.Provider>
    );
}

export {
    PlayerContext,
    PlayerContextProvider
};