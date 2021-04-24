import axios from "axios";
import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Badge, Button, Card, Form } from "react-bootstrap";
import { AppContext } from '../AppContextProvider';

export default function JoinRoomPage() {

    const { setRoomID, setName, setDescription } = useContext( AppContext );

    const [ roomIdInput, setRoomIdInput ] = useState("");
    // const [ nameInput, setNameInput ] = useState("");
    const [ passwordInput, setPasswordInput ] = useState("");

    const history = useHistory();

    function joinRoom() {

        console.log(roomIdInput);
        // console.log(nameInput);
        console.log(passwordInput);

        const sessionData = {
            _id: roomIdInput,
            // name: nameInput,
            password: passwordInput,
        };

        console.log("submitting info...");
        console.log(sessionData);

        axios.post("http://localhost:3000/api/room/join/", sessionData)
            .then((res) => {
                const responseData = res.data;
                if (responseData.name) {
                    setRoomID(responseData._id);
                    setName(responseData.name);
                    setDescription(responseData.description);
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
                                            setRoomIdInput(e.target.value)
                                        }
                                        placeholder="Room ID"
                                    />
                                </Form.Group>
                                {/* <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Name (Optional)</Form.Label>
                                    <Form.Control
                                        // value={name}
                                        onInput={(e) => setNameInput(e.target.value)}
                                        placeholder="Name"
                                    />
                                </Form.Group> */}
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Password (Optional)</Form.Label>
                                    <Form.Control
                                        // value={password}
                                        onInput={(e) =>
                                            setPasswordInput(e.target.value)
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
