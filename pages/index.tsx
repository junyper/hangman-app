import React, { useCallback } from 'react';
import useSWR from 'swr';
import { Game } from './components/Game';

const fetcher = (query) =>
  fetch('/api/word', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ query }),
  })
    .then((res) => res.json())
    .then((json) => {
      if (json.errors) {
        throw new Error(json.errors.map(({ message }) => message).join('. '));
      } else if (!json.data) {
        throw new Error('Malformed API response.');
      } else {
        return json.data;
      }
    });

export default function Index(): JSX.Element {
  const { data, error, mutate } = useSWR('{ word { name, definition } }', fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const handleReload = useCallback(() => {
    mutate();
  }, [mutate]);

  return <Game data={data} error={error} reload={handleReload} />;
}
