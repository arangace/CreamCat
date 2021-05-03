import "react-bootstrap";
import { useContext, useEffect } from "react";
import ReactPlayer from "react-player";
import { PlayerContext } from "../../PlayerContextProvider";
import { AppContext } from "../../AppContextProvider";

export default function Player() {
    const {
        playing,
        setPlaying,
        setDuration,
        setSongLength,
        volume
    } = useContext(PlayerContext);
    const { socket, currentSong, key } = useContext(AppContext);

    function currentSongContext() {
        if (currentSong) {
            console.log(currentSong.content);
            return currentSong.content;
        } else {
            console.log(`No current song!`);
        }
    }

    function handleOnProgress(e) {
        setDuration(e.playedSeconds.toFixed(0));
    }
    function handleSongLengthChange(e) {
        setSongLength(e.toFixed(0) - 1);
    }

    function handleOnEnded(e) {
        console.log("Playing ended");
        socket.emit("song end", currentSong);

        // wait listen for new song
    }
    return (
        <>
            <ReactPlayer
                url={currentSongContext()}
                onProgress={(e) => handleOnProgress(e)}
                onReady={() => {
                    console.log(`onReady`);
                    setPlaying(true);
                }}
                key={key}
                playing={playing}
                volume={volume}
                onDuration={(e) => handleSongLengthChange(e)}
                onEnded={(e) => handleOnEnded(e)}
                height="0"
                width="0"
            />
        </>
    );
}
