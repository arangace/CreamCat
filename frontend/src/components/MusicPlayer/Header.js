import { Navbar } from "react-bootstrap";
import React, { useContext } from "react";
import { AppContext } from "../../AppContextProvider";
import SearchBar from "../SearchBar";
import styles from "./Header.module.css";


export default function Header() {
    const {currentRoom} = useContext(AppContext);

    return (
        <>
            <div className={styles.navRoom}>
                <Navbar fixed="top" variant="dark" bg="dark" className={styles.navRoom}>
                    <Navbar.Brand >{currentRoom.name}</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse>
                        <Navbar.Text>Room ID: {currentRoom._id}</Navbar.Text>
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
