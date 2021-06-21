import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import reactRouter from 'react-router';
import { Board } from '../../../types/board';
import { RecentBoards } from './RecentBoards';
import * as boardsService from '../../../service/boards';

jest.mock('../../../service/boards');
const mockHistoryPush = jest.fn();

describe('RecentBoards component', () => {
  beforeEach(() => {
    jest.spyOn(reactRouter, 'useHistory').mockReturnValue({ push: mockHistoryPush } as any);
  });
  it('should display no recent boards when no boards found in user local storage', async () => {
    act(() => {
      render(<RecentBoards />);
    });
    expect(screen.getByText('No recent Task Board found')).toBeInTheDocument();
  });
  it('should display recent boards when boards found in local storage', async () => {
    const mockBoards: Board[] = [
      { id: 'abv', name: 'avengers', createdBy: 'IronMan' },
      { id: 'xyz', name: 'Hobbit', createdBy: 'SpiderMan' },
    ] as Board[];
    jest.spyOn(boardsService, 'getBoards').mockReturnValue(mockBoards);

    act(() => {
      render(<RecentBoards />);
    });

    await waitFor(() => screen.getByText(mockBoards[0].name));

    expect(screen.getByText(mockBoards[0].name)).toBeInTheDocument();
    expect(screen.getByText(mockBoards[0].createdBy)).toBeInTheDocument();
    expect(screen.getByText(mockBoards[1].name)).toBeInTheDocument();
    expect(screen.getByText(mockBoards[1].createdBy)).toBeInTheDocument();
  });

  it('should navigate to the board when clicking on chatRoom', async () => {
    const mockBoards: Board[] = [
      { id: 'abc', name: 'avengers', createdBy: 'IronMan' },
      { id: 'xyz', name: 'test', createdBy: 'SpiderMan' },
    ] as Board[];
    jest.spyOn(boardsService, 'getBoards').mockReturnValue(mockBoards);

    act(() => {
      render(<RecentBoards />);
    });

    await waitFor(() => screen.getByText(mockBoards[0].name));
    userEvent.click(screen.getByText(mockBoards[0].name));
    await waitFor(() => expect(mockHistoryPush).toHaveBeenCalledWith('/boards/abc'));
  });
});
