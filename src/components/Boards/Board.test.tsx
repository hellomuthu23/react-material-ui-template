import { act, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import reactRouter from 'react-router';
import * as boardsService from '../../service/boards';
import { Board } from '../../types/board';
import { Status } from '../../types/status';
import { BoardComponent } from './Board';

jest.mock('../../service/boards');
const mockHistoryPush = jest.fn();

describe('Board component', () => {
  beforeEach(() => {
    jest.spyOn(reactRouter, 'useHistory').mockReturnValue({ push: mockHistoryPush } as any);
    jest.spyOn(reactRouter, 'useParams').mockReturnValue({ Id: 'zz' } as any);
  });
  it('should display board not found', async () => {
    render(<BoardComponent />);
    expect(screen.getByText('Board not found')).toBeInTheDocument();
  });
  it('should display chatRoom area when chatRoom is found', async () => {
    const mockBoard: Board = {
      id: 'abc',
      name: 'avengers',
      createdBy: 'IronMan',
      status: Status.NotStarted,
      tasks: [
        {
          createdAt: new Date(),
          name: 'First Task',
          id: 'id1',
          status: Status.NotStarted,
          createdBy: 'someone',
          description: 'this first desc',
        },
      ],
    } as Board;

    jest.spyOn(boardsService, 'getBoard').mockReturnValue(mockBoard);
    render(<BoardComponent />);

    expect(screen.getByText(mockBoard.name)).toBeInTheDocument();
  });
});
