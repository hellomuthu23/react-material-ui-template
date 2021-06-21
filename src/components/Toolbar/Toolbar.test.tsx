import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { Toolbar } from './Toolbar';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

jest.mock('@material-ui/core', () => ({
  ...jest.requireActual('@material-ui/core'),
  useMediaQuery: () => false,
}));

describe('Toolbar component', () => {
  const { location } = window;
  beforeAll(() => {
    // @ts-ignore
    delete window.location;
    // @ts-ignore
    window.location = { href: '' };
  });

  afterAll((): void => {
    window.location = location;
  });
  it('should render correct title', () => {
    render(<Toolbar />);
    const title = screen.getByText('Task Board');
    expect(title).toBeInTheDocument();
  });
  it('should render Create new board button', () => {
    render(<Toolbar />);
    const newBoard = screen.getByText('New Board');
    expect(newBoard).toBeInTheDocument();
  });
  it('should render Open board button', () => {
    render(<Toolbar />);
    const openBoard = screen.getByText('Open Board');
    expect(openBoard).toBeInTheDocument();
  });
  it('should navigate to Home page when New Board button is clicked', () => {
    render(<Toolbar />);
    const newBoard = screen.getByText('New Board');
    act(() => {
      userEvent.click(newBoard);
    });
    expect(mockHistoryPush).toBeCalledWith('/');
  });
  it('should navigate to open board page when Open board button is clicked', () => {
    render(<Toolbar />);
    const openBoard = screen.getByText('Open Board');
    act(() => {
      userEvent.click(openBoard);
    });
    expect(mockHistoryPush).toBeCalledWith('/join');
  });
  it('should navigate to home page when Title is clicked clicked', () => {
    render(<Toolbar />);
    const title = screen.getByText('Task Board');
    act(() => {
      userEvent.click(title);
    });
    expect(mockHistoryPush).toBeCalledWith('/');
  });
  it('should navigate to github page when Github icon is clicked clicked', () => {
    const toolbar = render(<Toolbar />);
    const title = toolbar.container.querySelector('#github-button') as HTMLElement;
    act(() => {
      userEvent.click(title);
    });
    expect(window.location.href).toEqual('https://github.com/hellomuthu23/react-material-ui-template');
  });
});
