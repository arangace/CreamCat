import "react-bootstrap";
import { useContext } from 'react';
import ReactPlayer from 'react-player';
import { PlayerContext } from "../../PlayerContextProvider";

export default function Player() {
    const { playing, setDuration, setSongLength, volume } = useContext(PlayerContext);


    function handleOnProgress(e) {
        setDuration(e.playedSeconds.toFixed(0));
    }
    function handleSongLengthChange(e) {
        setSongLength(e.toFixed(0) - 1);
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