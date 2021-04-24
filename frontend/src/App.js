import { Redirect, Route, Switch } from "react-router-dom";
import HomePage from "./components/HomePage";
import JoinRoomPage from "./components/JoinRoom";
import NavBar from "./components/Navbar";
import JoinOrCreateRoomPage from "./components/JoinOrCreateRoom";

function App() {
    return (
        <div>
            <div>
                <NavBar></NavBar>
            </div>
            <Switch>
                <Route path="/Home">
                    <HomePage />
                </Route>
                <Route path="/Features"></Route>
                <Route path="/JoinOrCreateRoom">
                    <JoinOrCreateRoomPage/>
                </Route>
                <Route path="/JoinRoom">
                    <JoinRoomPage></JoinRoomPage>
                </Route>
                <Route path="*">
                    <Redirect to="/Home" />
                </Route>
            </Switch>
        </div>
    );
}

export default App;
