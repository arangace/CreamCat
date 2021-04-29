import "react-bootstrap";
import { useContext } from 'react';
import { AppContext } from '../AppContextProvider';
import MusicPlayer from './MusicPlayer';
import SearchBar from './SearchBar'
import Player from './MusicPlayer/Player';

export default function Room() {
    return (
        <>
            <div className="temp-gap"></div>
            <Player></Player>

            <MusicPlayer />
        </>
    );
}