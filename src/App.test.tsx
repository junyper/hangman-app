import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import App from './App';

test('renders the definition', async () => {
  render(<App />);

  await waitFor(() => {
    expect(screen.getByText(/definition: a fruit/i)).toBeInTheDocument();
  });
});
