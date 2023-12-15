import React from 'react';
import { render, screen } from '@testing-library/react';
import PriceList from './PriceList';

test('displays formatted date for each price', async () => {
  // Mock prices data with specific dates
  const mockPrices = [
    { id: 1, price: 19.99, date: '2023-01-01' },
    { id: 2, price: 29.99, date: '2023-02-15' },
  ];

  jest.spyOn(global, 'fetch').mockResolvedValueOnce({
    json: jest.fn().mockResolvedValueOnce(mockPrices),
    ok: true,
  });

  render(<PriceList />);

  // Assert that formatted dates are displayed correctly
  expect(screen.getByText('01/01/2023')).toBeInTheDocument();
  expect(screen.getByText('15/02/2023')).toBeInTheDocument();
});
