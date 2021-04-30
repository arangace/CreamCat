import "react-bootstrap";
import MusicPlayer from './MusicPlayer';
import { RoomContextProvider } from "../RoomContextProvider";


export default function Room() {



    return (
        <>
            <div className="temp-gap"></div>

            <RoomContextProvider>
                <MusicPlayer />

            </RoomContextProvider>
            
        </>
    );
}