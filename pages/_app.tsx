import App, { AppContext, AppInitialProps, AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router'
import { IntlProvider } from 'react-intl';
import { OrderContextProvider, IOrderInitialState } from 'contexts/Order';
import { UserContextProvider, IUserInitialState } from 'contexts/User';
import '../styles/fonts.scss'
import '../styles/global.scss';

interface IInitialProps {
  user: IUserInitialState;
  order: IOrderInitialState;
}
function CustomApp({ Component, pageProps, user, order }: AppProps & IInitialProps) {
  const router = useRouter();

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
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
        <UserContextProvider value={user}>
          <OrderContextProvider value={order}>
            <Component {...pageProps} />
          </OrderContextProvider>
        </UserContextProvider>
      </IntlProvider>
    </>
  );
}

CustomApp.getInitialProps = async (
  context: AppContext
): Promise<AppInitialProps & IInitialProps> => {
  const ctx = await App.getInitialProps(context);
  const { SAMPLE_USER_PROFILE, SAMPLE_USER_ORDER } =  require('fixtures');

  return {
    ...ctx,
    user: SAMPLE_USER_PROFILE,
    order: SAMPLE_USER_ORDER
  };
};


export default CustomApp;
