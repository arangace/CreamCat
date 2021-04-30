import "react-bootstrap";
import { useContext } from 'react';
import { AppContext } from '../../AppContextProvider';
import ReactPlayer from 'react-player';
import axios from 'axios';

export default function Player() {
    const { playing, handleSetDuration, handleSongLength, volume, tracks } = useContext(AppContext);


    function handleonProgress(e) {
        handleSetDuration(e.playedSeconds.toFixed(0));
    }
    function handleSongLengthChange(e) {
        handleSongLength(e.toFixed(0) - 1);
    }
    return (
        <>

            <ReactPlayer url={"https://www.youtube.com/watch?v=5TrM0rFaclw&ab_channel=GiveonVEVO"}
                onProgress={e => (handleonProgress(e))}
                playing={playing}
                volume={volume}
                onDuration={e => (handleSongLengthChange(e))}
                loop={true}
                height='0'
                width='0' />
        </>
    );
}