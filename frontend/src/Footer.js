import 'react-bootstrap';

import { Card } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { CardGroup } from 'react-bootstrap';
import styles from './styles.css';
export default function Footer() {
    return (
        <>
            <div className="footer">
                <Card bg="dark" text="white">
                    <Card.Body  >
                        <Card.Title>Special title treatment</Card.Title>
                        <Card.Text >
                            With supporting text below as a natural lead-in to additional content.
    </Card.Text>
                        <Card.Text >
                            With supporting text below as a natural lead-in to additional content.
    </Card.Text>
                        <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                </Card>
                <CardGroup>
                    <Card>
                        <Card.Body>
                            <Card.Title>Card title</Card.Title>
                            <Card.Text>
                                This is a wider card with supporting text below as a natural lead-in to
                                additional content. This content is a little bit longer.
      </Card.Text>
                        </Card.Body>

                    </Card>
                    <Card>
                        <Card.Body>
                            <Card.Title>Card title</Card.Title>
                            <Card.Text>
                                This card has supporting text below as a natural lead-in to additional
        content.{' '}
                            </Card.Text>
                        </Card.Body>

                    </Card>
                    <Card>
                        <Card.Body>
                            <Card.Title>Card title</Card.Title>
                            <Card.Text>
                                This is a wider card with supporting text below as a natural lead-in to
                                additional content. This card has even longer content than the first to
                                show that equal height action.
      </Card.Text>
                        </Card.Body>

                    </Card>
                </CardGroup>
                <Card.Footer>
                    <small className="text-muted">Last updated 3 mins ago</small>
                </Card.Footer>
            </div>
        </>

    )


}
