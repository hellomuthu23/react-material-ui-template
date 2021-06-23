import { render, screen } from '@testing-library/react';
import React from 'react';
import { TaskCard } from './TaskCard';
import { Status } from '../../../types/status';
import { Task } from '../../../types/board';

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
}));
describe('TaskCard component', () => {
  const mockTask: Task = {
    createdAt: new Date(),
    name: 'First Task',
    id: 'id1',
    status: Status.NotStarted,
    createdBy: 'someone',
    description: 'this first desc',
  };
  it('should display correct task data', () => {
    render(<TaskCard task={mockTask} boardId='23' />);
    expect(screen.getByText(mockTask.name)).toBeInTheDocument();
    expect(screen.getByText(mockTask.description!)).toBeInTheDocument();
    expect(screen.getByText('S')).toBeInTheDocument();
  });
});
