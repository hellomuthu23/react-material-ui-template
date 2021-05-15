import { render, screen } from '@testing-library/react';
import React from 'react';
import { Room } from '../../types/room';
import { User } from '../../types/user';
import { Status } from '../../types/status';
import { Users } from './Users';

describe('Users component', () => {
  const mockRoom: Room = {
    id: 'xyz',
    name: 'testRoom',
    createdBy: 'someone',
    createdAt: new Date(),
    average: 0,
    createdById: 'abc',
    roomStatus: Status.InProgress,
  };
  const mockUsers: User[] = [
    { id: 'a1', name: 'SpiderMan', status: Status.InProgress, value: 0 },
    { id: 'a2', name: 'IronMan', status: Status.Finished, value: 3 },
  ];
  it('should display all players', () => {
    render(<Users chatRoom={mockRoom} players={mockUsers} />);

    mockUsers.forEach((player: User) => {
      expect(screen.getByText(player.name)).toBeInTheDocument();
    });
  });
});
