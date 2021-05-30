import { render, screen } from '@testing-library/react';
import React from 'react';
import { Board } from '../../../types/board';
import { User } from '../../../types/user';
import { Status } from '../../../types/status';
import { BoardArea } from './RoomArea';

describe('RoomArea component', () => {
  const mockRoom: Board = {
    id: 'xyz',
    name: 'testRoom',
    createdBy: 'someone',
    createdAt: new Date(),
    average: 0,
    createdById: 'abc',
    status: Status.InProgress,
  };
  const mockUsers: User[] = [
    { id: 'a1', name: 'SpiderMan', status: Status.InProgress, value: 0 },
    { id: 'a2', name: 'IronMan', status: Status.Finished, value: 3 },
  ];
  const mockCurrentUserId = mockUsers[0].id;
  it('should display players', () => {
    render(<BoardArea board={mockRoom} players={mockUsers} currentUserId={mockCurrentUserId} />);

    mockUsers.forEach((player: User) => {
      expect(screen.getByText(player.name)).toBeInTheDocument();
    });
  });

  it('should display chatRoom controller with name', () => {
    render(<BoardArea board={mockRoom} players={mockUsers} currentUserId={mockCurrentUserId} />);
    expect(screen.getByText(mockRoom.name)).toBeInTheDocument();
  });
  it('should display card picker', () => {
    render(<BoardArea board={mockRoom} players={mockUsers} currentUserId={mockCurrentUserId} />);

    expect(screen.queryAllByText('5')).toHaveLength(3);
  });
});
