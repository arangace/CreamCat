import { Button, Form, FormControl, Nav } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";

export default function NavBar() {
    return (
        <>
            <Navbar fixed="top" bg="dark" variant="dark">
                <Navbar.Brand href="/Home">CreamCat</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="JoinRoom">Join Room</Nav.Link>
                    <Nav.Link href="CreateRoom">Create Room</Nav.Link>
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
