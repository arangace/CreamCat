import { Redirect, Route, Switch } from "react-router-dom";
import CreateRoomPage from "./components/CreateRoom";
import Room from "./components/Room";
import HomePage from "./components/HomePage";
import JoinRoomPage from "./components/JoinRoom";
import NavBar from "./components/Navbar";
import RoomPage from "./components/RoomPage";

function App() {
    return (
        <div>
            <div>
                <NavBar></NavBar>
            </div>
            <Switch>
                <Route path="/Home">
                    <HomePage/>
                </Route>
                <Route path="/Features"></Route>
                <Route path="/RoomPage">
                    <RoomPage/>
                </Route>
                <Route path="/CreateRoom">
                    <CreateRoomPage/>
                </Route>
                <Route path="/Room">
                    <Room/>
                </Route>
                <Route path="/JoinRoom">
                    <JoinRoomPage/>
                </Route>
                <Route path="*">
                    <Redirect to="/RoomPage" />
                </Route>
            </Switch>
        </div>
    );
}

export default App;
