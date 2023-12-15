import React from 'react';
import { render } from '@testing-library/react';
import PriceList from './PriceList';

test('renders links for navigation', () => {
  const { getByText } = render(<PriceList />);
  const addPriceLink = getByText(/Agregar Precio/i);
  const productListLink = getByText(/Volver a la Lista de Productos/i);

  expect(addPriceLink).toBeInTheDocument();
  expect(productListLink).toBeInTheDocument();
});
