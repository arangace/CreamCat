import "react-bootstrap";
import {useContext} from 'react';
import {AppContext} from '../AppContextProvider';
import MusicPlayer from './MusicPlayer';

export default function Room() {
    const { roomID, name, description } = useContext(AppContext);
    return (
        <>
            <MusicPlayer/>
        </>
    );
}