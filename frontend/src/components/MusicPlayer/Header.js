import { Navbar, Tooltip, OverlayTrigger, Button } from "react-bootstrap";
import React, { useContext } from "react";
import { AppContext } from "../../AppContextProvider";
import SearchBar from "../SearchBar";
import styles from "./Header.module.css";

export default function Header() {
    const { currentRoom } = useContext(AppContext);

    function handleClick(RoomIDCopiedValue) {
        console.log(RoomIDCopiedValue);
        navigator.clipboard.writeText(RoomIDCopiedValue)
    }

    return (
        <>
            <div className={styles.navRoom}>

                <Navbar fixed="top" variant="dark" bg="dark" className={styles.navRoom}>
                    <Navbar.Brand >{currentRoom.name}</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse>
                        <div className={styles.RoomIDCopy} onClick={() => (handleClick(currentRoom._id))}>
                            <OverlayTrigger placement="bottom" overlay={<Tooltip >Copy ID to clipboard</Tooltip>}>
                                <span className="d-inline-block">
                                    <Navbar.Text >Room ID: {currentRoom._id}
                                        <div className={styles.copyClipboard}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard" viewBox="0 0 16 16">
                                                <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
                                                <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
                                            </svg>
                                        </div>
                                    </Navbar.Text>
                                </span>
                            </OverlayTrigger>
                        </div>
                    </Navbar.Collapse>
                    {/*<Form inline>
                        <FormControl
                            type="text"
                            placeholder="Search"
                            className="mr-sm-2"
                        />
                        <Button variant="outline-info" onClick={handleSearch}>Search</Button>
                    </Form>*/}
                    <SearchBar />
                </Navbar>
            </div>
        </>
    );
}
