import 'react-bootstrap';

import Navbar from 'react-bootstrap/Navbar'
import { Nav } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import styles from './styles.css';
export default function NavBar() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="Home">CreamCat</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="Features">Features</Nav.Link>
          <Nav.Link href="About">About</Nav.Link>
          <Nav.Link href="Support">Support</Nav.Link>
          <Nav.Link href="Login">Login</Nav.Link>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-info">Search</Button>
        </Form>
      </Navbar>
    </>
  )


}
