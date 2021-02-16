import React from 'react';
import { render, screen } from '@testing-library/react';
import waitForExpect from 'wait-for-expect';

import App from './App';

test('renders the definition', async () => {
  render(<App />);

  await waitForExpect(() => {
    expect(screen.getByText(/definition: a fruit/i)).toBeInTheDocument();
  });
});
