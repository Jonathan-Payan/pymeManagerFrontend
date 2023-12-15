import React from 'react';
import { render } from '@testing-library/react';
import PriceList from './PriceList';

test('displays purchase and sale prices', () => {
  // Mock prices data
  const mockPrices = [
    { id: 1, price: 19.99, date: '2023-01-01' },
    { id: 2, price: 29.99, date: '2023-02-01' },
  ];

  jest.spyOn(global, 'fetch').mockResolvedValueOnce({
    json: jest.fn().mockResolvedValueOnce(mockPrices),
    ok: true,
  });

  const { getByText } = render(<PriceList />);
  const purchasePriceHeader = getByText(/Precios de Compra/i);
  const salePriceHeader = getByText(/Precios de Venta/i);

  expect(purchasePriceHeader).toBeInTheDocument();
  expect(salePriceHeader).toBeInTheDocument();

});
