
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
                            <div className="landing-page-route">
                                <p className="centered"><Button variant="dark" block="true" size="lg" href="Room">Login</Button></p>
                            </div>
                        </Card.Text>
                    </Card.ImgOverlay>
                </Card>
            </div>
        </>

    )


}
