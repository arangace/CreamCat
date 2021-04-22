import 'react-bootstrap';

import { Card } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { CardGroup } from 'react-bootstrap';
import styles from './styles.css';
export default function Footer() {
    return (
        <>
            <div className="footer">



                <CardGroup>
                    <Card bg="dark" text="white">
                        <Card.Body  >
                            <Card.Title>Placeholder information</Card.Title>
                            <Card.Text >
                                Optional info
    </Card.Text>
                            <Card.Text >
                                Optional info
    </Card.Text>

                            <Button variant="secondary" size="lg" className="centered">Link</Button>
                        </Card.Body>
                    </Card>
                    <Card bg="dark" text="white">
                        <Card.Body>
                            <Card.Title>About</Card.Title>
                            <Card.Text>
                                Some about information about our software product and team
      </Card.Text>
                        </Card.Body>

                    </Card>
                    <Card bg="dark" text="white">
                        <Card.Body>
                            <Card.Title>Support</Card.Title>
                            <Card.Text>
                                Support information regarding FAQ's and helpful links to provide additional support
                            </Card.Text>
                        </Card.Body>

                    </Card>
                    <Card bg="dark" text="white">
                        <Card.Body>
                            <Card.Title>Social media</Card.Title>
                            <Card.Text>
                                Useful links from team CreamCat:
                                <Button variant="outline-dark" >
                                    <img width="40px" height="40px" alt="No icon provided" src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg">
                                    </img>
                                </Button>
                                <Button variant="outline-dark" >
                                    <a href='https://github.com/arangace/CreamCat'>
                                        <img width="40px" height="40px" alt="No icon provided" src="https://icons-for-free.com/iconfiles/png/512/part+1+github-1320568339880199515.png">
                                        </img>
                                    </a>
                                </Button>
                            </Card.Text>
                        </Card.Body>
                    </Card>

                </CardGroup>
                <Card.Footer>
                    <small className="text-muted">Content created by team CreamCat</small>
                </Card.Footer>
            </div>
        </>

    )


}
