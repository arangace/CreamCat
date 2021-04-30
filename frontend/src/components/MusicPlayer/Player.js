import "react-bootstrap";
import { useContext } from 'react';
import { PlayerContext } from '../../PlayerContextProvider';
import ReactPlayer from 'react-player';

export default function Player() {
    const { playing, handleSetDuration, handleSongLength, volume } = useContext(PlayerContext);


    function handleOnProgress(e) {
        handleSetDuration(e.playedSeconds.toFixed(0));
    }
    function handleSongLengthChange(e) {
        handleSongLength(e.toFixed(0) - 1);
    }
    return (
        <>
            <ReactPlayer url={"https://www.youtube.com/watch?v=5TrM0rFaclw&ab_channel=GiveonVEVO"}
                onProgress={e => (handleOnProgress(e))}
                playing={playing}
                volume={volume}
                onDuration={e => (handleSongLengthChange(e))}
                loop={true}
                height='0'
                width='0' />
        </>
    );
}