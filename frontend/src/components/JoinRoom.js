import axios from "axios";
import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Badge, Button, Card, Form } from "react-bootstrap";
import { AppContext } from '../AppContextProvider';

export default function JoinRoomPage() {

    const { roomID, setRoomID, name, setName } = useContext( AppContext );
    const [ password, setPassword ] = useState("");

    const history = useHistory();

    function joinRoom() {

        console.log(roomID);
        console.log(name);
        console.log(password);

        setRoomID(roomID);

        const sessionData = {
            _id: roomID,
            name: name,
            password: password,
        };

        console.log("submitting info...");
        console.log(sessionData);

        axios.post("http://localhost:3000/api/room/join/", sessionData)
            .then((res) => {
                const responseData = res.data;
                if (responseData.name) {
                    history.replace(`/Room`);
                }

                if ( responseData === 'password incorrect!') {
                    console.log(responseData);
                }else if (responseData === 'room not found!'){
                    console.log(responseData);
                }
            })    
    }
    return (
        <>
            <div className="JoinRoom">
                <Card className="bg-secondary text-white">
                    <Badge variant="dark" className="room-centered">
                        <h1>CreamCat</h1>
                    </Badge>
                    <Card.Text>
                        <div className="join-room-page ">
                            <Form>
                                <h1>Join Room</h1>
                                <Form.Group controlId="RoomID">
                                    <Form.Label>Room ID</Form.Label>
                                    <Form.Control
                                        // value={roomID}
                                        onInput={(e) =>
                                            setRoomID(e.target.value)
                                        }
                                        placeholder="Room ID"
                                    />
                                </Form.Group>
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Name (Optional)</Form.Label>
                                    <Form.Control
                                        // value={name}
                                        onInput={(e) => setName(e.target.value)}
                                        placeholder="Name"
                                    />
                                </Form.Group>
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Password (Optional)</Form.Label>
                                    <Form.Control
                                        // value={password}
                                        onInput={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        placeholder="Password"
                                    />
                                </Form.Group>
                                <Button
                                    variant="dark"
                                    type="button"
                                    onClick={joinRoom}
                                >
                                    Join
                                </Button>
                            </Form>
                        </div>
                    </Card.Text>
                </Card>
            </div>
        </>
    );
}
