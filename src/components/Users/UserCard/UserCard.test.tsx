import { render, screen } from '@testing-library/react';
import React from 'react';
import { Room } from '../../../types/room';
import { User } from '../../../types/user';
import { Status } from '../../../types/status';
import { UserCard } from './UserCard';

describe('UserCard component', () => {
  const mockRoom: Room = {
    id: 'xyz',
    name: 'testRoom',
    createdBy: 'someone',
    createdAt: new Date(),
    average: 0,
    createdById: 'abc',
    roomStatus: Status.InProgress,
  };
  const mockUser: User = { id: 'a1', name: 'SpiderMan', status: Status.InProgress, value: 0 };

  it('should display User name', () => {
    render(<UserCard chatRoom={mockRoom} player={mockUser} />);

    expect(screen.getByText(mockUser.name)).toBeInTheDocument();
  });

  it('should display thinking emoji when User has not voted', () => {
    render(<UserCard chatRoom={mockRoom} player={mockUser} />);

    expect(screen.getByText('🤔')).toBeInTheDocument();
  });
  it('should display thumbs up emoji when User has voted', () => {
    const votedUser = { ...mockUser, status: Status.Finished };
    render(<UserCard chatRoom={mockRoom} player={votedUser} />);

    expect(screen.getByText('👍')).toBeInTheDocument();
  });

  it('should display coffee up emoji when User has voted but value is -1 and chatRoom is finished', () => {
    const coffeeUser = { ...mockUser, status: Status.Finished, value: -1 };
    const finishedRoom = { ...mockRoom, chatRoomStatus: Status.Finished };
    render(<UserCard chatRoom={finishedRoom} player={coffeeUser} />);

    expect(screen.getByText('☕')).toBeInTheDocument();
  });

  it('should display correct when User has voted and chatRoom is finished', () => {
    const coffeeUser = { ...mockUser, status: Status.Finished, value: 5 };
    const finishedRoom = { ...mockRoom, chatRoomStatus: Status.Finished };
    render(<UserCard chatRoom={finishedRoom} player={coffeeUser} />);

    expect(screen.getByText('5')).toBeInTheDocument();
  });
  it('should display thinking emoji when User has not voted and chatRoom is finished', () => {
    const coffeeUser = { ...mockUser, status: Status.InProgress };
    const finishedRoom = { ...mockRoom, chatRoomStatus: Status.Finished };
    render(<UserCard chatRoom={finishedRoom} player={coffeeUser} />);

    expect(screen.getByText('🤔')).toBeInTheDocument();
  });
});
