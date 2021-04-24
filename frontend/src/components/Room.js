import "react-bootstrap";
import {useContext} from 'react';
import {AppContext} from '../AppContextProvider';

export default function Room() {
    const { roomID } = useContext(AppContext);
    console.log(`Created room (ID: ${roomID})`);
    return (
        <>
            <div></div>
        </>
    );
}