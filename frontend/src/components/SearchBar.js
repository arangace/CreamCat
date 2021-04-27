import youtube from './youtubeSearch' 
import React,{useState} from 'react'
import Modal from 'react-modal';
import { Form, FormControl, Button } from "react-bootstrap";


export default function SearchBar(){

    const [searchQuery, setSearchQuery] = useState({
        search: ""
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setSearchQuery((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    }

    const handleSubmit = async (e) => {

        const term = searchQuery.search
        /*const response = await youtube.get('/search', {
            params:{
                q: term
            }
        })*/
        const response = {
            data: term
        }
        console.log(term)
        openModal()
    }

    const [modalIsOpen,setIsOpen] = React.useState(false);

    function openModal() {
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
                >
                    <div>cant see</div>
                    <div>I am a modal</div>
                    <div>This modal will display the search results from youtube</div>
                    <button onClick={closeModal}>close</button>
                </Modal>

            </div>
        </>
    )
}