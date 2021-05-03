import "react-bootstrap";
import { io } from "socket.io-client";
import { useContext, useEffect } from "react";
import { AppContext } from "../AppContextProvider";
import MusicPlayer from "./MusicPlayer";

export default function Room() {
    // TODO: add state for userCount in AppContext
    const {
        currentRoom,
        setUserCount,
        setVersion,
        setSocket,
        setKey
    } = useContext(AppContext);

    useEffect(() => {
        // Connect to socket on localhost server and pass roomId
        const socket = io({
            query: {
                roomID: currentRoom._id,
                password: currentRoom.password,
            },
        });
        socket.on("FromAPI on connect", (data) => {
            // Parse response into AppContext
            const { userCount } = data;
            setUserCount(userCount);
            setSocket(socket);
        });
        socket.on("FromAPI on addSong", () => addSongCallback());

        socket.on("FromAPI refetch", () => {
            console.log(`Refetch called by API`);
            setVersion(v =>!v);
            setKey(k => k+1);
        });

    }, []);

    function addSongCallback(){
        console.log(`New song message received from socket...`);
            setVersion( v => !v );
    }

    return (
        <>
            <div className="temp-gap"></div>
            <MusicPlayer />
        </>
    );
}
