import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import reactRouter from 'react-router';
import * as chatRoomService from '../../../service/chatRooms';
import * as playersService from '../../../service/users';
import { Room } from '../../../types/room';
import { JoinRoom } from './JoinRoom';

jest.mock('../../../service/players');
jest.mock('../../../service/chatRooms');
const mockHistoryPush = jest.fn();
describe('JoinRoom component', () => {
  beforeEach(() => {
    jest.spyOn(reactRouter, 'useHistory').mockReturnValue({ push: mockHistoryPush } as any);
    jest.spyOn(reactRouter, 'useParams').mockReturnValue({ id: '' });
  });
  it('should display correct text fields', () => {
    render(<JoinRoom />);

    expect(screen.getByPlaceholderText('xyz...')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your name')).toBeInTheDocument();
  });

  it('should display join button', () => {
    render(<JoinRoom />);

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('Join');
  });
  it('should be able to join a session', async () => {
    jest.spyOn(playersService, 'addUserToRoom').mockResolvedValue(true);
    render(<JoinRoom />);
    const sessionID = screen.getByPlaceholderText('xyz...');
    userEvent.clear(sessionID);
    userEvent.type(sessionID, 'chatRoomId');

    const userName = screen.getByPlaceholderText('Enter your name');
    userEvent.type(userName, 'Rock');

    const joinButton = screen.getByText('Join');

    act(() => {
      userEvent.click(joinButton);
    });

    expect(playersService.addUserToRoom).toHaveBeenCalled();

    expect(playersService.addUserToRoom).toHaveBeenCalledWith('chatRoomId', 'Rock');
    await waitFor(() => expect(mockHistoryPush).toHaveBeenCalledWith('/chatRoom/chatRoomId'));
  });

  it('should automatically join the chatRoom when player has already joined', async () => {
    const chatRoomId = 'abc';
    jest.spyOn(reactRouter, 'useParams').mockReturnValue({ id: chatRoomId });
    jest.spyOn(chatRoomService, 'getRoom').mockResolvedValue({ id: chatRoomId } as Room);
    jest.spyOn(playersService, 'addUserToRoom').mockResolvedValue(true);
    jest.spyOn(playersService, 'isCurrentUserInRoom').mockReturnValue(true);

    act(() => {
      render(<JoinRoom />);
    });

    await waitFor(() => expect(mockHistoryPush).toHaveBeenCalledWith('/chatRoom/abc'));
  });
});
