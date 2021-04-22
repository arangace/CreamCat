
import 'react-bootstrap';
import { Card } from 'react-bootstrap';

import { Jumbotron } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import styles from './styles.css';
export default function Footer() {
    return (
        <>
            <div className="body">
                <Card className="bg-secondary text-white">
                    <div className="image-sizing">
                        {/* <Card.Img src="" alt="No image specified" /> */}
                    </div>
                    <Card.ImgOverlay>
                        <Card.Title><h1 className="body-text">The best collaborative music web application out there!</h1>
                        </Card.Title>
                        <Card.Text>
                            <p className="centered">
                                Extensive library to search for any song and listen together with your friends!</p>
                        </Card.Text>
                        <Card.Text>
                            <p className="centered"><Button variant="primary" size="lg">Login</Button></p>
                        </Card.Text>
                    </Card.ImgOverlay>
                </Card>
            </div>
        </>

    )


}
