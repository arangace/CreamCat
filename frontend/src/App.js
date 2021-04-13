import { useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import styles from './styles.css';
import NavBar from './Navbar';
import HomePage from './HomePage';
import RoomPage from './Room';



function App() {

  return (
    <div>
      <div>

        <NavBar>

        </NavBar>

      </div>
      <Switch>
        <Route path="/Home">
          <HomePage />
        </Route>
        <Route path="/Features">
        </Route>
        <Route path="/Room">
          <RoomPage></RoomPage>
        </Route>
        <Route path="*">
          <Redirect to="/Home" />
        </Route>
      </Switch>
    </div >
  );
}

export default App;