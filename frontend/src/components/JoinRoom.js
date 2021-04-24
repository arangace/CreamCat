
import { useState } from 'react';
import styles from "./styles.css";
import { Badge, Button, Card, Form } from 'react-bootstrap';


export default function JoinRoomPage() {
    const [RoomID, setRoomID] = useState('');
    const [Name, setName] = useState('');
    const [Password, setPassword] = useState('');

    function submitForm() {

        console.log(RoomID);
        console.log(Name);
        console.log(Password);
        const sessionData = {
            "RoomID": RoomID,
            "Name": Name,
            "Password": Password,
        };
        console.log("submitting info...");
        console.log((sessionData));
    };
    return (
        <>
            <div className="JoinRoom">
                <Card className="bg-secondary text-white">
                    <Badge variant="dark" className="room-centered"><h1 >
                        CreamCat</h1></Badge>
                    <Card.Text>
                        <div className="join-room-page ">
                            <Form>
                                <h1>Join Room</h1>
                                <Form.Group controlId="RoomID">
                                    <Form.Label>Room ID</Form.Label>
                                    <Form.Control value={RoomID} onInput={e => setRoomID(e.target.value)} placeholder="Room ID" />
                                </Form.Group>
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Name (Optional)</Form.Label>
                                    <Form.Control value={Name} onInput={e => setName(e.target.value)} placeholder="Name" />
                                </Form.Group>
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Password (Optional)</Form.Label>
                                    <Form.Control value={Password} onInput={e => setPassword(e.target.value)} placeholder="Password" />
                                </Form.Group>
                                <Button variant="dark" type="button" onClick={submitForm}>
                                    Join
                                </Button>
                            </Form>
                        </div>
                    </Card.Text>
                </Card>
            </div>
        </>

    )


}
