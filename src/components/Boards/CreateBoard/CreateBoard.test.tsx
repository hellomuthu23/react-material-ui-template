import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { CreateBoard } from './CreateBoard';
import * as boardsService from '../../../service/boards';

jest.mock('../../../service/boards');
jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
}));
describe('CreateRoom component', () => {
  it('should display correct text fields', () => {
    render(<CreateBoard />);

    expect(screen.getByPlaceholderText('Enter a board name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your name')).toBeInTheDocument();
  });

  it('should display create button', () => {
    render(<CreateBoard />);

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('Create');
  });
  it('should be able to create new board', async () => {
    render(<CreateBoard />);
    const boardName = screen.getByPlaceholderText('Enter a board name');
    userEvent.type(boardName, 'Marvels');

    const userName = screen.getByPlaceholderText('Enter your name');
    userEvent.type(userName, 'Rock');

    const createButton = screen.getByText('Create');
    userEvent.click(createButton);

    expect(boardsService.addNewBoard).toHaveBeenCalled();

    expect(boardsService.addNewBoard).toHaveBeenCalledWith(
      expect.objectContaining({ createdBy: 'SuperHeroRock', name: 'EuroTourMarvels' })
    );
  });
});
