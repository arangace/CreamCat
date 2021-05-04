import youtube from './youtubeSearch'
import React, { useContext, useState, useEffect } from 'react'
import Modal from 'react-modal';
import { Form, FormControl, Button, Alert } from "react-bootstrap";
import { AppContext } from '../AppContextProvider'
import axios from 'axios'
import './SearchBar.css'

Modal.setAppElement('#root')

export default function SearchBar() {
    const { currentRoom } = useContext(AppContext)

    const [searchQuery, setSearchQuery] = useState({
        search: ""
    });
    const [searchResults, setSearchResults] = useState([]);
    const [show, setShow] = useState(false);
    const [addedSongTitle, setAddedSongTitle] = useState();

    const addSong = (e) => {
        setShow(true);
        const index = e.target.getAttribute("data-index")
        const songToAdd = {
            roomID: currentRoom._id,
            password: currentRoom.password,
            title: searchResults[index].snippet.title,
            content: "https://www.youtube.com/watch?v=" + searchResults[index].id.videoId
        }
        setAddedSongTitle((songToAdd.title));
        console.log(songToAdd)
        axios.post('http://localhost:3000/api/Playlist/add/', songToAdd)
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setSearchQuery((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log("start")
        const term = searchQuery.search
        const response = await youtube.get('/search', {
            params: {
                q: term
            }
        })
        setSearchResults(response.data.items)
        openModal()
    }


    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }
    useEffect(() => {
        const timeId = setTimeout(() => {
            // After 3 seconds set the show value to false
            setShow(false)
        }, 3000)
        return () => {
            clearTimeout(timeId)
        }
    }, [show]);

    return (
        <>
            <div className='addSongConfirmation'>
                <Alert show={show} variant="success">
                    <Alert.Heading>Song Added!  </Alert.Heading>
                    <p>{addedSongTitle}</p>
                </Alert>
            </div>
            <div>

                <Form inline onSubmit={handleSubmit}>
                    <FormControl
                        type="text"
                        id="search"
                        className="mr-sm-2"
                        value={searchQuery.term}
                        onChange={handleChange}
                        placeholder="Search"
                    />

                    <Button
                        variant="outline-info"
                        onClick={handleSubmit}
                    >
                        Search
                    </Button>

                </Form>

                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="Example Modal"
                    className="searchModal"
                >
                    <button onClick={closeModal} className="close">X</button>
                    <div>
                        <br></br>
                        {searchResults.map((data, index) => (
                            <li key={index}>
                                <Button key={index} data-index={index} onClick={addSong} className="button" variant="outline-info">Add Song</Button>
                                &emsp; {data.snippet.title}, https://www.youtube.com/watch?v={data.id.videoId}
                            </li>
                        )
                        )}
                    </div>
                </Modal>
            </div>
        </>
    )
}