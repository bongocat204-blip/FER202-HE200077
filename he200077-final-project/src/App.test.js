import { render, screen } from '@testing-library/react';
import App from './App';

test('renders BonggoShop branding in navbar', () => {
  render(<App />);
  const brandElements = screen.getAllByText(/BonggoShop/i);
  expect(brandElements.length).toBeGreaterThan(0);
});
