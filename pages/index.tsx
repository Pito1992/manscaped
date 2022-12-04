import { ORDER_CART } from 'constants/routes';

function Home() {
  return null
}

export async function getServerSideProps() {
  return {
    redirect: {
      destination: ORDER_CART,
      permanent: true,
    },
    props: {},
  }
}

export default Home