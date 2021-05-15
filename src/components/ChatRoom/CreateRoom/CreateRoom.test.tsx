import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { CreateRoom } from './CreateRoom';
import * as chatRoomsService from '../../../service/chatRooms';

jest.mock('../../../service/chatRooms');
jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
}));
describe('CreateRoom component', () => {
  it('should display correct text fields', () => {
    render(<CreateRoom />);

    expect(screen.getByPlaceholderText('Enter a session name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your name')).toBeInTheDocument();
  });

  it('should display create button', () => {
    render(<CreateRoom />);

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('Create');
  });
  it('should be able to create new session', async () => {
    render(<CreateRoom />);
    const sessionName = screen.getByPlaceholderText('Enter a session name');
    userEvent.type(sessionName, 'Marvels');

    const userName = screen.getByPlaceholderText('Enter your name');
    userEvent.type(userName, 'Rock');

    const createButton = screen.getByText('Create');
    userEvent.click(createButton);

    expect(chatRoomsService.addNewRoom).toHaveBeenCalled();

    expect(chatRoomsService.addNewRoom).toHaveBeenCalledWith(
      expect.objectContaining({ createdBy: 'SuperHeroRock', name: 'AvengersMarvels' })
    );
  });
});
