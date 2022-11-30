import { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router'
import { IntlProvider } from 'react-intl';
import '../styles/fonts.scss'
import '../styles/global.scss';

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <>
      <Head>
        <link rel="icon" href="//favicon.ico" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="Front-end challenge"
          content="a simple work to prove developer's skills"
        />
        <link rel="apple-touch-icon" href="/logo192.png" />
        <link rel="manifest" href="/manifest.json" />
        <title>Manscaped&apos;s Front-end challenge</title>
      </Head>
      <IntlProvider locale={router.locale!}>
        <Component {...pageProps} />
      </IntlProvider>
    </>
  );
}

export default App;
