import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { act } from 'react-dom/test-utils';
import * as playersService from '../../../service/users';
import { Room } from '../../../types/room';
import { User } from '../../../types/user';
import { Status } from '../../../types/status';
import { CardPicker, cards } from './CardPicker';

jest.mock('../../../service/players');
describe('CardPicker component', () => {
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
  const currentUserId = mockUsers[0].id;
  it('should display correct card values', () => {
    const cardPicker = render(<CardPicker chatRoom={mockRoom} players={mockUsers} currentUserId={currentUserId} />);

    cards
      .filter((a) => a.value >= 0)
      .forEach((card) => {
        const cardElement = cardPicker.container.querySelector(`#card-${card.value}`);
        expect(cardElement).toBeInTheDocument();
        const cardValueElement = screen.queryAllByText(card.value);
        expect(cardValueElement.length).toBeGreaterThan(0);
      });
  });
  it('should update player value when player clicks on a card', () => {
    const currentUserId = mockUsers[0].id;
    const updateUserValueSpy = jest.spyOn(playersService, 'updateUserValue');
    render(<CardPicker chatRoom={mockRoom} players={mockUsers} currentUserId={currentUserId} />);
    const cardValueElement = screen.queryAllByText(5);
    act(() => {
      userEvent.click(cardValueElement[0]);
    });
    expect(updateUserValueSpy).toHaveBeenCalled();
    expect(updateUserValueSpy).toHaveBeenCalledWith(mockRoom.id, currentUserId, 5);
  });

  it('should not update player value when player clicks on a card and chatRoom is finished', () => {
    const currentUserId = mockUsers[0].id;
    const updateUserValueSpy = jest.spyOn(playersService, 'updateUserValue');
    const finishedRoomMock = {
      ...mockRoom,
      chatRoomStatus: Status.Finished,
    };
    render(<CardPicker chatRoom={finishedRoomMock} players={mockUsers} currentUserId={currentUserId} />);
    const cardValueElement = screen.queryAllByText(5);
    act(() => {
      userEvent.click(cardValueElement[0]);
    });
    expect(updateUserValueSpy).toHaveBeenCalledTimes(0);
  });
  it('should display Click on the card to vote when chatRoom is not finished', () => {
    const currentUserId = mockUsers[0].id;

    render(<CardPicker chatRoom={mockRoom} players={mockUsers} currentUserId={currentUserId} />);
    const helperText = screen.getByText('Click on the card to vote');

    expect(helperText).toBeInTheDocument();
  });
  it('should display wait message to vote when chatRoom is finished', () => {
    const currentUserId = mockUsers[0].id;
    const finishedRoomMock = {
      ...mockRoom,
      chatRoomStatus: Status.Finished,
    };
    render(<CardPicker chatRoom={finishedRoomMock} players={mockUsers} currentUserId={currentUserId} />);
    const helperText = screen.getByText('Session not ready for Voting! Wait for moderator to start');

    expect(helperText).toBeInTheDocument();
  });
});
