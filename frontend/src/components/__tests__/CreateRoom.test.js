import React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CreateRoomPage from '../CreateRoom';
import {AppContext} from '../../AppContextProvider';

it('creates a room properly', async() =>{
    const dummyCreateRoom = jest.fn();

    // Test first render and effect
    render(
        <AppContext.Provider value={{createRoom: dummyCreateRoom}}>
            <CreateRoomPage />
        </AppContext.Provider>
    )
    
})