import "react-bootstrap";
import youtube from './youtubeSearch';
import React,{useState} from 'react'
import { Button} from "react-bootstrap";


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
        console.log("start")
        const term = searchQuery.search
        const response = await youtube.get('/search', {
            params:{
                q: term
            }
        })
        console.log(response.data.items)
    }

    return (
        <>
            <div className='search-bar ui segment'>
                <form>
                    <div>
                        <label className="black-title">Search Music</label>
                        <input
                            type="text"
                            id="search"
                            className="form-control"
                            value={searchQuery.term}
                            onChange={handleChange}
                            placeholder="Search"
                        />
                    </div>
                    <div
                        type="submit"
                        >
                        <Button
                            onClick={handleSubmit}
                        >
                            Search
                        </Button>
                    </div>

                </form>
            </div>
        </>
    )
}