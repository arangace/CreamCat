import "react-bootstrap";
import {useContext} from 'react';
import {AppContext} from '../AppContextProvider';

export default function Room() {
    const { roomID, name, description } = useContext(AppContext);
    return (
        <>
            <div>{roomID}</div>
            <div>{name}</div>
            <div>{description}</div>
        </>
    );
}