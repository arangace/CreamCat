import { Button, Form, FormControl, Nav } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";

export default function NavBar() {
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="/Home">CreamCat</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="Features">Features</Nav.Link>
                    <Nav.Link href="About">About</Nav.Link>
                    <Nav.Link href="Support">Support</Nav.Link>
                    <Nav.Link href="Login">Login</Nav.Link>
                </Nav>
                <Form inline>
                    <FormControl
                        type="text"
                        placeholder="Search"
                        className="mr-sm-2"
                    />
                    <Button variant="outline-info">Search</Button>
                </Form>
            </Navbar>
        </>
    );
}
