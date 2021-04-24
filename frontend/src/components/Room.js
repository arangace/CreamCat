import "react-bootstrap";
import {useContext} from 'react';
import {AppContext} from '../AppContextProvider';

export default function Room() {
    const { roomID, name, description } = useContext(AppContext);
    console.log(`Created room (ID: ${roomID})`);
    return (
        <>
            <div>{roomID}</div>
            <div>{name}</div>
            <div>{description}</div>
        </>
    );
}