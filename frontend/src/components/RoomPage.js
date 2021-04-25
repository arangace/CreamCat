import { Badge, Button, Card } from "react-bootstrap";

export default function RoomPage() {
    return (
        <>
            <div className="Room">
                <Card className="bg-secondary text-white">
                    <Badge variant="dark" className="room-centered">
                        <h1>CreamCat</h1>
                    </Badge>
                    <Card.Text>
                        <div className="landing-page-route">
                            <p className="centered">
                                <Button
                                    variant="dark"
                                    block="true"
                                    size="lg"
                                    href="JoinRoom"
                                >
                                    Join Room
                                </Button>
                            </p>
                            <p className="centered">
                                <Button
                                    variant="dark"
                                    block="true"
                                    size="lg"
                                    href="CreateRoom"
                                >
                                    Create Room
                                </Button>
                            </p>
                        </div>
                    </Card.Text>
                </Card>
            </div>
        </>
    );
}
