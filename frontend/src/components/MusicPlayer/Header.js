import { Navbar, Tooltip, OverlayTrigger, Button } from "react-bootstrap";
import React, { useContext } from "react";
import { AppContext } from "../../AppContextProvider";
import SearchBar from "../SearchBar";
import styles from "./Header.module.css";
import { FaClipboard } from "react-icons/fa";

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
                                            <FaClipboard/>
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
