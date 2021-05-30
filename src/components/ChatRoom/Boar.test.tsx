import { act, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import reactRouter from 'react-router';
import * as chatRoomsService from '../../service/boards';
import * as playersService from '../../service/users';
import { Board } from '../../types/board';
import { User } from '../../types/user';
import { Status } from '../../types/status';
import { BoardComponent } from './Board';

jest.mock('../../service/players');
// jest.mock('../../service/chatRooms');
const mockHistoryPush = jest.fn();

describe('Board component', () => {
  beforeEach(() => {
    jest.spyOn(reactRouter, 'useHistory').mockReturnValue({ push: mockHistoryPush } as any);
    jest.spyOn(reactRouter, 'useParams').mockReturnValue({ Id: 'zz' } as any);
  });
  it('should display chatRoom not found', async () => {
    jest.spyOn(chatRoomsService, 'streamRoom').mockImplementation(() => {
      return {
        onSnapshot: jest.fn((success) => success({ exists: false })),
      } as any;
    });
    jest.spyOn(chatRoomsService, 'streamUsers').mockImplementation(() => {
      return {
        onSnapshot: jest.fn(() => Promise.resolve(true)),
      } as any;
    });
    act(() => {
      render(<BoardComponent />);
    });
    await waitFor(() => expect(screen.getByText('chatRoom not found')).toBeInTheDocument());
  });
  it('should display chatRoom area when chatRoom is found', async () => {
    const mockRoom: Board = {
      id: 'abc',
      name: 'avengers',
      createdBy: 'IronMan',
      status: Status.NotStarted,
    } as Board;
    const mockUsers: User[] = [
      {
        id: 'xx',
        name: ' xyz',
        status: Status.NotStarted,
        value: 0,
      },
    ] as User[];
    jest.spyOn(chatRoomsService, 'streamRoom').mockImplementation(() => {
      return {
        onSnapshot: jest.fn((success) => success({ exists: true, data: () => mockRoom })),
      } as any;
    });
    jest.spyOn(chatRoomsService, 'streamUsers').mockImplementation(() => {
      return {
        onSnapshot: jest.fn((success) => success({ exists: true, forEach: () => mockUsers })),
      } as any;
    });

    jest.spyOn(playersService, 'getCurrentUserId').mockReturnValue('322');
    act(() => {
      render(<BoardComponent />);
    });

    await waitFor(() => screen.getByText(mockRoom.name));

    expect(screen.getByText(mockRoom.name)).toBeInTheDocument();
    expect(screen.getByText(mockRoom.status)).toBeInTheDocument();
  });
});
