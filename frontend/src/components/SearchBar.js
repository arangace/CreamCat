import youtube from './youtubeSearch' 
import React,{useState} from 'react'
import Modal from 'react-modal';
import { Form, FormControl, Button } from "react-bootstrap";
import styles from './search.css'

Modal.setAppElement('#root')

export default function SearchBar(){

    const [searchQuery, setSearchQuery] = useState({
        search: ""
    });
    const [searchResults, setSearchResults] = useState([]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setSearchQuery((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    }

    const handleSubmit = async (e) => {
        console.log("start")
        const term = searchQuery.search
        const response = await youtube.get('/search', {
            params:{
                q: term
            }
        })
        setSearchResults(response.data.items)
        openModal()
    }

    const [modalIsOpen,setIsOpen] = React.useState(false);

    function openModal() {
        console.log(searchResults)
        setIsOpen(true);
    }

    function closeModal(){
        setIsOpen(false);
    }

    return (
        <>
            <div>
                <Form inline>
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
                            <p> {index+1}, {data.snippet.title} </p>)
                        )}
                    </div>

                </Modal>

            </div>
        </>
    )
}