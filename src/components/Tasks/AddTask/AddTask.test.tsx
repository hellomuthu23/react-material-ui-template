import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { AddTask } from './AddTask';
import * as tasksService from '../../../service/task';

jest.mock('../../../service/task');
jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
}));
describe('AddTask component', () => {
  it('should display correct text fields', () => {
    render(<AddTask boardId='2' show={true} onClose={jest.fn} />);

    expect(screen.getByPlaceholderText('Enter a task name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter description')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your name')).toBeInTheDocument();
  });

  it('should display create button', () => {
    render(<AddTask boardId='2' show={true} onClose={jest.fn} />);

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('Add');
  });
  it('should be able to create new task', async () => {
    render(<AddTask boardId='2' show={true} onClose={jest.fn} />);
    const taskName = screen.getByPlaceholderText('Enter a task name');
    userEvent.type(taskName, 'Marvels');

    const userName = screen.getByPlaceholderText('Enter your name');
    userEvent.type(userName, 'Rock');

    const addButton = screen.getByText('Add');
    userEvent.click(addButton);

    expect(tasksService.addTask).toHaveBeenCalled();
  });
});
