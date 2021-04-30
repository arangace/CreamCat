import "react-bootstrap";
import { useContext } from 'react';
import { AppContext } from '../AppContextProvider';
import MusicPlayer from './MusicPlayer';
import SearchBar from './SearchBar'


export default function Room() {
    return (
        <>
            <div className="temp-gap"></div>


            <MusicPlayer />
        </>
    );
}