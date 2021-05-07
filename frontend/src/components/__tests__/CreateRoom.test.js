import React from 'react';
import ReactDOM from 'react-dom';
import { render, fireEvent, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CreateRoomPage from '../CreateRoom';
import {AppContextProvider} from '../../AppContextProvider';

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

it('creates a room properly', async() =>{
  // Test first render and effect
  act(() => {
    ReactDOM.render((
        <AppContextProvider>
            <CreateRoomPage />
        </AppContextProvider>
    ), container);
    });
    const searchButton = container.querySelector('Button')
    expect(searchButton.textContent).toBe('Create Room')
})