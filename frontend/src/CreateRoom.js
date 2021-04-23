import 'react-bootstrap';
import { Card } from 'react-bootstrap';
import { Jumbotron } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Badge } from 'react-bootstrap';
import styles from './styles.css';

export default function CreateRoomPage() {
    return (
        <>
            <div className="Room2">
                <Card className="bg-secondary text-white">
                    <Badge variant="dark" className="room-centered"><h1 >
                        CreamCat</h1></Badge>
                    <div className="card col-lg-4 mt-2 input-form">
                        <form>
                            <div>
                            <label className="black-title">Room Name</label>
                            <input type="text" 
                                className="form-control pad-bot" 
                                placeholder="Enter room name"/>
                            </div>
                            <div>
                                <label className="black-title">Description</label>
                                <input type="text" 
                                    className="form-control pad-bot"  
                                    placeholder="Enter description"
                                />
                            </div>
                            <div>
                                <label className="black-title">Password</label>
                                <input type="password" 
                                    className="form-control pad-bot" 
                                    id="password" 
                                    placeholder="Enter password"
                                />
                            </div>
                            <div type="submit" className="landing-page-route create-room-button">
                                <Button variant="dark" block="true" size="lg" href="Dummy">Create Room</Button>
                            </div>
                        </form>
                    </div>
                </Card>
            </div>
        </>

    )


}