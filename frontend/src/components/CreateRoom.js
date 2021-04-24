import axios from "axios";
import React, { useState } from "react";
import { Badge, Button, Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";

export default function CreateRoomPage() {
    const history = useHistory();

    const handleChange = (e) => {
        const { id, value } = e.target;
        setState((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    };

    const [state, setState] = useState({
        name: "",
        description: "",
        password: "",
    });

    const handleSubmit = (e) => {
        const room = {
            name: state.name,
            description: state.description,
            password: state.password,
        };
        console.log(room);
        axios.post("http://localhost:3000/api/room/create/", room);
        history.replace(`/Dummy`);
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
                                    value={state.name}
                                    onChange={handleChange}
                                    placeholder="Enter room name"
                                />
                            </div>
                            <div>
                                <label className="black-title">
                                    Description
                                </label>
                                <input
                                    type="text"
                                    id="description"
                                    className="form-control pad-bot"
                                    value={state.description}
                                    onChange={handleChange}
                                    placeholder="Enter description"
                                />
                            </div>
                            <div>
                                <label className="black-title">Password</label>
                                <input
                                    type="password"
                                    className="form-control pad-bot"
                                    id="password"
                                    value={state.password}
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
                                    onClick={handleSubmit}
                                >
                                    Create Room
                                </Button>
                            </div>
                        </form>
                    </div>
                </Card>
            </div>
        </>
    );
}
