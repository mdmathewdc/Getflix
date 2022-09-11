import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom';

describe('Getflix test suite', () => {
  it('should display the the app title', () => {
    const { getByText } = render(<App />);
    expect(getByText('GETFLIX')).toBeTruthy();
  });

  it('should display the empty search state box only for empty search', () => {
    const { getByPlaceholderText, getByText } = render(<App />);
    fireEvent.change(getByPlaceholderText('Search...'), {
      target: { value: '' },
    });
    expect(getByText('Type something in the search box...')).toBeInTheDocument();

    fireEvent.change(getByPlaceholderText('Search...'), {
      target: { value: 'Batman' },
    });
    const emptySearchBox = screen.queryByText('Type something in the search box...');
    expect(emptySearchBox).toBeNull(); // It doesn't exist
  });
});
