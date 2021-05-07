import React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import NavBar from '../NavBar';

it('checks links are rendered in NavBar', async() =>{
    const dummyCreateRoom = jest.fn();
    render(<NavBar/>)

    expect(screen.queryByText('CreamCat')).not.toBeNull();
    expect(screen.queryByText('Join Room')).not.toBeNull();
    expect(screen.queryByText('Create Room')).not.toBeNull();

})