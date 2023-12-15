import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import PriceList from './PriceList';

test('navigates to add price page when clicking "Agregar Precio"', () => {
  render(
    <MemoryRouter>
      <PriceList />
    </MemoryRouter>
  );

  const addPriceLink = screen.getByText(/Agregar Precio/i);
  userEvent.click(addPriceLink);

  // Assert that navigation occurred to the add price page
  expect(screen.getByText(/Agregar Nuevo Precio/i)).toBeInTheDocument();
});
