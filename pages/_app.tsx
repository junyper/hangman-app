if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
  if (typeof window === 'undefined') {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { server } = require('../mocks/server');
    server.listen();
  } else {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { worker } = require('../mocks/browser');
    worker.start();
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function App({ Component, pageProps }): JSX.Element {
  return <Component {...pageProps} />;
}
