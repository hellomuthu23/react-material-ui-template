import { render, screen } from '@testing-library/react';
import React from 'react';
import App from './App';
jest.mock('./service/boards');

describe('App', () =>
  it('Should display toolbar with header', () => {
    render(<App />);
    const toolBarHeader = screen.getByText('Task Board');
    expect(toolBarHeader).toBeInTheDocument();
  }));
