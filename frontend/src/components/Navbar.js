import { useContext } from "react";
import { Button, Form, FormControl, Nav } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import { AppContext } from "../AppContextProvider";


export default function NavBar() {

    const { currentRoom, setCurrentRoom } = useContext(AppContext);

    function leaveRoom() {
        localStorage.removeItem("currentRoom");
        setCurrentRoom("");

    }

    return (
        <>
            <Navbar fixed="top" bg="dark" variant="dark">
                <Navbar.Brand href="/Home">CreamCat</Navbar.Brand>
                <Nav className="mr-auto">
                    {!currentRoom && <Nav.Link href="JoinRoom">Join Room</Nav.Link>}
                    {!currentRoom && <Nav.Link href="CreateRoom">Create Room</Nav.Link>}
                    {currentRoom && <Nav.Link href="Room">Current Room</Nav.Link>}
                    {currentRoom && <Nav.Link onClick={leaveRoom}>Leave Room</Nav.Link>}
                    {/* <Nav.Link href="Login">Login</Nav.Link> */}
                </Nav>
                {/* <Form inline>
                    <FormControl
                        type="text"
                        placeholder="Search"
                        className="mr-sm-2"
                    />
                    <Button variant="outline-info">Search</Button>
                </Form> */}
            </Navbar>
        </>
    );
}
