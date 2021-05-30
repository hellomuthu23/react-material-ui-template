import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import reactRouter from 'react-router';
import * as playersService from '../../../service/users';
import { Board } from '../../../types/board';
import { RecentBoards } from './RecentBoards';

jest.mock('../../../service/players');
const mockHistoryPush = jest.fn();

describe('RecentRooms component', () => {
  beforeEach(() => {
    jest.spyOn(reactRouter, 'useHistory').mockReturnValue({ push: mockHistoryPush } as any);
  });
  it('should display no recent session when no chatRooms found in user local storage', async () => {
    act(() => {
      render(<RecentBoards />);
    });
    expect(screen.getByText('No recent sessions found')).toBeInTheDocument();
  });
  it('should display recent chatRooms when chatRooms found in local storage', async () => {
    const mockRooms: Board[] = [
      { id: 'abv', name: 'avengers', createdBy: 'IronMan' },
      { id: 'xyz', name: 'endchatRoom', createdBy: 'SpiderMan' },
    ] as Board[];
    jest.spyOn(playersService, 'getUserRecentRooms').mockResolvedValue(mockRooms);

    act(() => {
      render(<RecentBoards />);
    });

    await waitFor(() => screen.getByText(mockRooms[0].name));

    expect(screen.getByText(mockRooms[0].name)).toBeInTheDocument();
    expect(screen.getByText(mockRooms[0].createdBy)).toBeInTheDocument();
    expect(screen.getByText(mockRooms[1].name)).toBeInTheDocument();
    expect(screen.getByText(mockRooms[1].createdBy)).toBeInTheDocument();
  });

  it('should navigate to the chatRoom when clicking on chatRoom', async () => {
    const mockRooms: Board[] = [
      { id: 'abc', name: 'avengers', createdBy: 'IronMan' },
      { id: 'xyz', name: 'endchatRoom', createdBy: 'SpiderMan' },
    ] as Board[];
    jest.spyOn(playersService, 'getUserRecentRooms').mockResolvedValue(mockRooms);

    act(() => {
      render(<RecentBoards />);
    });

    await waitFor(() => screen.getByText(mockRooms[0].name));
    userEvent.click(screen.getByText(mockRooms[0].name));
    await waitFor(() => expect(mockHistoryPush).toHaveBeenCalledWith('/chatRoom/abc'));
  });
});
