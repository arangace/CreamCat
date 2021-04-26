import "react-bootstrap";
import {useContext} from 'react';
import {AppContext} from '../AppContextProvider';
import SearchBar from './SearchBar'

export default function Room() {
    const { roomID, name, description } = useContext(AppContext);
    return(
        <>
            <SearchBar/>
            <div>{roomID}</div>
            <div>{name}</div>
            <div>{description}</div>
        </>
    );
}