import { render, screen } from '@testing-library/react';
import React from 'react';
import { Board } from '../../../types/board';
import { Status } from '../../../types/status';
import { BoardArea } from './BoardArea';

describe('BoardArea component', () => {
  const mockBoard: Board = {
    id: 'xyz',
    name: 'testRoom',
    createdBy: 'someone',
    createdAt: new Date(),
    createdById: 'abc',
    status: Status.InProgress,
    tasks: [
      {
        createdAt: new Date(),
        name: 'First Task',
        id: 'id1',
        status: Status.NotStarted,
        createdBy: 'someone',
        description: 'this first desc',
      },
      {
        createdAt: new Date(),
        name: 'Second Task',
        id: 'id2',
        status: Status.InProgress,
        createdBy: 'someone',
        description: 'this second desc',
      },
      {
        createdAt: new Date(),
        name: 'Third Task',
        id: 'id1',
        status: Status.Finished,
        createdBy: 'someone',
        description: 'this third desc',
      },
    ],
  };

  it('should display board name', () => {
    render(<BoardArea board={mockBoard} />);

    expect(screen.getByText(mockBoard.name)).toBeInTheDocument();
  });

  it('should display task columns', () => {
    render(<BoardArea board={mockBoard} />);

    expect(screen.getByText('Todo')).toBeInTheDocument();
    expect(screen.getByText('Doing')).toBeInTheDocument();
    expect(screen.getByText('Done')).toBeInTheDocument();
  });
  it('should display task cards', () => {
    render(<BoardArea board={mockBoard} />);

    mockBoard.tasks.forEach((task) => {
      expect(screen.getByText(task.name)).toBeInTheDocument();
    });
  });
});
