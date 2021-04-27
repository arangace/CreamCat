import { Navbar, Form, FormControl, Button } from "react-bootstrap";
import SearchBar from "../SearchBar";
import styles from "./Header.module.css";

export default function Header() {
    // need context
    const roomName = "Room Name";
    const roomID = "Room ID (Can add an event listener that copies ID into clipboard)";

    {/*const handleSearch = () => {
        // add search song functionality here
    } */}

    return (
        <>
            <div className={styles.navRoom}>
                <Navbar fixed="top" variant="dark" bg="dark" className={styles.navRoom}>
                    <Navbar.Brand >{roomName}</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse>
                        <Navbar.Text>Room ID: {roomID}</Navbar.Text>
                    </Navbar.Collapse>
                    {/*<Form inline>
                        <FormControl
                            type="text"
                            placeholder="Search"
                            className="mr-sm-2"
                        />
                        <Button variant="outline-info" onClick={handleSearch}>Search</Button>
                    </Form>*/}
                    <SearchBar/>
                </Navbar>
            </div>
        </>
    );
}
