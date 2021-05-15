import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import reactRouter from 'react-router';
import * as playersService from '../../../service/users';
import { Room } from '../../../types/room';
import { RecentRooms } from './RecentRooms';

jest.mock('../../../service/players');
const mockHistoryPush = jest.fn();

describe('RecentRooms component', () => {
  beforeEach(() => {
    jest.spyOn(reactRouter, 'useHistory').mockReturnValue({ push: mockHistoryPush } as any);
  });
  it('should display no recent session when no chatRooms found in user local storage', async () => {
    act(() => {
      render(<RecentRooms />);
    });
    expect(screen.getByText('No recent sessions found')).toBeInTheDocument();
  });
  it('should display recent chatRooms when chatRooms found in local storage', async () => {
    const mockRooms: Room[] = [
      { id: 'abv', name: 'avengers', createdBy: 'IronMan' },
      { id: 'xyz', name: 'endchatRoom', createdBy: 'SpiderMan' },
    ] as Room[];
    jest.spyOn(playersService, 'getUserRecentRooms').mockResolvedValue(mockRooms);

    act(() => {
      render(<RecentRooms />);
    });

    await waitFor(() => screen.getByText(mockRooms[0].name));

    expect(screen.getByText(mockRooms[0].name)).toBeInTheDocument();
    expect(screen.getByText(mockRooms[0].createdBy)).toBeInTheDocument();
    expect(screen.getByText(mockRooms[1].name)).toBeInTheDocument();
    expect(screen.getByText(mockRooms[1].createdBy)).toBeInTheDocument();
  });

  it('should navigate to the chatRoom when clicking on chatRoom', async () => {
    const mockRooms: Room[] = [
      { id: 'abc', name: 'avengers', createdBy: 'IronMan' },
      { id: 'xyz', name: 'endchatRoom', createdBy: 'SpiderMan' },
    ] as Room[];
    jest.spyOn(playersService, 'getUserRecentRooms').mockResolvedValue(mockRooms);

    act(() => {
      render(<RecentRooms />);
    });

    await waitFor(() => screen.getByText(mockRooms[0].name));
    userEvent.click(screen.getByText(mockRooms[0].name));
    await waitFor(() => expect(mockHistoryPush).toHaveBeenCalledWith('/chatRoom/abc'));
  });
});
