import React from 'react';
import { render } from '@testing-library/react';
import PriceList from './PriceList';

test('displays message when no prices are available', () => {
  jest.spyOn(global, 'fetch').mockResolvedValueOnce({
    json: jest.fn().mockResolvedValueOnce([]),
    ok: true,
  });

  const { getByText } = render(<PriceList />);
  const noPricesMessage = getByText(/No hay precios disponibles/i);

  expect(noPricesMessage).toBeInTheDocument();
});
