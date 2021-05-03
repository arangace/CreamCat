import React, { useState, useContext } from "react";
import { Badge, Button, Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { AppContext } from '../AppContextProvider';

export default function CreateRoomPage() {

    const { createRoom } = useContext( AppContext );

    const [message, setMessage] = useState("");

    const history = useHistory();

    const handleChange = (e) => {
        const { id, value } = e.target;
        setNewRoom((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    };

    const [newRoom, setNewRoom] = useState({
        name: "",
        description: "",
        password: "",
    });

    const handleCreateRoom =  async (e) => {
        if(newRoom.name){
            await createRoom(newRoom);
            history.replace(`/Room`);
        }
        else{
            setMessage("Room name is required!");
        }
    };

    return (
        <>
            <div className="Room2">
                <Card className="bg-secondary text-white">
                    <Badge variant="dark" className="room-centered">
                        <h1>CreamCat</h1>
                    </Badge>
                    <div className="card col-lg-4 mt-2 input-form">
                        <form>
                            <div>
                                <label className="black-title">Room Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    className="form-control pad-bot"
                                    value={newRoom.name}
                                    onChange={handleChange}
                                    placeholder="Enter room name"
                                />
                            </div>
                            <div>
                                <label className="black-title">
                                    Description(Optional)
                                </label>
                                <input
                                    type="text"
                                    id="description"
                                    className="form-control pad-bot"
                                    value={newRoom.description}
                                    onChange={handleChange}
                                    placeholder="Enter description"
                                />
                            </div>
                            <div>
                                <label className="black-title">Password(Optional)</label>
                                <input
                                    type="password"
                                    className="form-control pad-bot"
                                    id="password"
                                    value={newRoom.password}
                                    onChange={handleChange}
                                    placeholder="Enter password"
                                />
                            </div>
                            <div
                                type="submit"
                                className="landing-page-route create-room-button"
                            >
                                <Button
                                    variant="dark"
                                    block="true"
                                    size="lg"
                                    onClick={handleCreateRoom}
                                >
                                    Create Room
                                </Button>
                            </div>
                            <div>
                                <span style={{color: 'red'}}>{message}</span>
                            </div>
                        </form>
                    </div>
                </Card>
            </div>
        </>
    );
}
