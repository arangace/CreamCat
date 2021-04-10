import { useState } from 'react';
import styles from './styles.css';
import NavBar from './Navbar';
import Footer from './Footer';
import Body from './Body';


function App() {

  return (
    <div>
      <div>

        <NavBar>

        </NavBar>
        <Body></Body>
      </div>
      <Footer></Footer>
    </div >
  );
}

export default App;