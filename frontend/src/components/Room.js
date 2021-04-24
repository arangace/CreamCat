import "react-bootstrap";
import {useContext} from 'react';
import {AppContext} from '../AppContextProvider';

export default function Room() {
    const { roomId } = useContext(AppContext);
    console.log( roomId );
    return (
        <>
            <div></div>
        </>
    );
}
