import { render, screen } from '@testing-library/react';
import React from 'react';
import { Room } from '../../../types/room';
import { Status } from '../../../types/status';
import { RoomController } from './RoomController';
import * as chatRoomsService from '../../../service/chatRooms';
import userEvent from '@testing-library/user-event';

jest.mock('../../../service/chatRooms');
const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));
document.execCommand = jest.fn();
describe('RoomController component', () => {
  const mockRoom: Room = {
    id: 'xyz',
    name: 'testRoom',
    createdBy: 'someone',
    createdAt: new Date(),
    average: 0,
    createdById: 'abc',
    roomStatus: Status.InProgress,
  };
  const mockCurrentUserId = 'abc';

  it('should display chatRoom name', () => {
    render(<RoomController chatRoom={mockRoom} currentUserId={mockCurrentUserId} />);
    expect(screen.getByText(mockRoom.name)).toBeInTheDocument();
  });
  it('should display chatRoom status', () => {
    render(<RoomController chatRoom={mockRoom} currentUserId={mockCurrentUserId} />);

    expect(screen.queryByText(mockRoom.roomStatus)).toBeInTheDocument();
  });
  it('should display chatRoom average value', () => {
    render(<RoomController chatRoom={mockRoom} currentUserId={mockCurrentUserId} />);

    expect(screen.queryByText(mockRoom.average)).toBeInTheDocument();
  });
  it('should display exit option', () => {
    render(<RoomController chatRoom={mockRoom} currentUserId={mockCurrentUserId} />);

    expect(screen.queryByText('Exit')).toBeInTheDocument();
  });

  it('should display invite option', () => {
    render(<RoomController chatRoom={mockRoom} currentUserId={mockCurrentUserId} />);

    expect(screen.queryByText('Invite')).toBeInTheDocument();
  });

  it('should copy invite link to clipboard', () => {
    render(<RoomController chatRoom={mockRoom} currentUserId={mockCurrentUserId} />);

    userEvent.click(screen.getByTestId('invite-button'));
    expect(document.execCommand).toHaveBeenCalledWith('copy');
  });

  it('should navigate to home page when exit button is clicked', () => {
    render(<RoomController chatRoom={mockRoom} currentUserId={mockCurrentUserId} />);

    userEvent.click(screen.getByTestId('exit-button'));
    expect(mockHistoryPush).toHaveBeenCalledWith('/');
  });

  describe('When User is Moderator', () => {
    it('should display reveal option', () => {
      render(<RoomController chatRoom={mockRoom} currentUserId={mockCurrentUserId} />);

      expect(screen.queryByText('Reveal')).toBeInTheDocument();
    });
    it('should display restart option', () => {
      render(<RoomController chatRoom={mockRoom} currentUserId={mockCurrentUserId} />);

      expect(screen.queryByText('Restart')).toBeInTheDocument();
    });
    it('should reveal cards when player click on Reveal button', () => {
      render(<RoomController chatRoom={mockRoom} currentUserId={mockCurrentUserId} />);
      userEvent.click(screen.getByTestId('reveal-button'));
      expect(chatRoomsService.finishRoom).toHaveBeenCalled();
    });
    it('should restart chatRoom when player click on Restart button', () => {
      render(<RoomController chatRoom={mockRoom} currentUserId={mockCurrentUserId} />);
      userEvent.click(screen.getByTestId('restart-button'));
      expect(chatRoomsService.resetRoom).toHaveBeenCalled();
    });
  });
});
