import React from 'react';
import { render } from '@testing-library/react';
import PriceList from './PriceList';

test('renders PriceList component', () => {
  const { getByText } = render(<PriceList />);
  const linkElement = getByText(/Precios del Producto/i);
  expect(linkElement).toBeInTheDocument();
});


