
import 'react-bootstrap';
import { Card } from 'react-bootstrap';
import { Jumbotron } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Badge } from 'react-bootstrap';
import styles from './styles.css';
export default function RoomPage() {
    return (
        <>
            <div className="Room">
                <Card className="bg-secondary text-white">
                    <Badge variant="dark" className="room-centered"><h1 >
                        CreamCat</h1></Badge>
                    <Card.Text>
                        <div className="landing-page-route">
                            <p className="centered"><Button variant="dark" block="true" size="lg" href="JoinRoom">Join Room</Button></p>
                            <p className="centered"><Button variant="dark" block="true" size="lg" href="CreateRoom">Create Room</Button></p>
                        </div>
                    </Card.Text>
                </Card>
            </div>
        </>

    )


}
