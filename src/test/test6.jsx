import React from 'react';
import { render, screen } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import PriceList from './PriceList';

const server = setupServer(
  rest.get('/api/sale-prices/:productCode', (req, res, ctx) => {
    return res(ctx.status(500), ctx.json({ message: 'Internal Server Error' }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('displays error message when prices fetch fails', async () => {
  render(<PriceList />);

  // Assert that an error message is displayed when fetching prices fails
  expect(await screen.findByText(/Error al obtener la lista de precios de venta/i)).toBeInTheDocument();
});
