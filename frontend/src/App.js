import { useState } from 'react';
import styles from './styles.css';
import NavBar from './Navbar';
import HomePage from './HomePage';
import { Switch, Route, Redirect } from 'react-router-dom';


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
      </Switch>
    </div >
  );
}

export default App;