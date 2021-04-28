import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Badge, Button, Card, Form } from "react-bootstrap";
import { AppContext } from '../AppContextProvider';

export default function JoinRoomPage() {

    const { joinRoom } = useContext( AppContext );

    const [ roomIdInput, setRoomIdInput ] = useState("");
    // const [ nameInput, setNameInput ] = useState("");
    const [ passwordInput, setPasswordInput ] = useState("");

    const [message, setMessage] = useState("");

    const history = useHistory();

    async function handleJoinRoom() {

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
        if(sessionData._id){
            const response = await joinRoom(sessionData);
            if (response === "forward") {
                history.replace(`/Room`);             
            }
            else{
                setMessage(response);
            }
        }
        else{
            setMessage("Room ID is required!");
        }
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
                                    onClick={handleJoinRoom}
                                >
                                    Join
                                </Button>
                                <div>
                                <span style={{color: 'red'}}>{message}</span>
                                </div>
                            </Form>
                        </div>
                    </Card.Text>
                </Card>
            </div>
        </>
    );
}
