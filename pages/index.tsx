import OrderCard from "../components/OrderCard";

import { PRODUCT_THUMBNAIL_GOLF, PRODUCT_THUMBNAIL_TENNIS } from '../constants/product-thumbnail';
import { SUBSCRIPTION_ORDER, PAID, UNFULFILLED } from '../constants/order';

const SAMPLE_USER_PROFILE = {
  firstName: 'Ryan',
  lastName: 'Fralick',
  shippingAddress: {
    street: '1489 DESERT SPRINGS AVE',
    city: 'RICHLAND',
    state: 'Washington',
    postalCode: '99352',
    country: 'United States'
  }
}

const SAMPLE_USER_ORDER = {
  id: 'US5426899',
  statuses: [SUBSCRIPTION_ORDER, PAID, UNFULFILLED],
  createdAt: 1614988800000,
  lastUpdatedAt: 1614988800000,
  currency: 'USD',
  productList: [{
    id: 'product-01',
    name: 'Ultricies Nibh',
    quantity: 2,
    price: '17.98',
    thumbnail: PRODUCT_THUMBNAIL_TENNIS
  }, {
    id: 'product-02',
    name: 'Fringilla Sollicitudin Consectetur',
    quantity: 1,
    price: '14.99',
    thumbnail: PRODUCT_THUMBNAIL_GOLF
  }]
}

function Home(): JSX.Element {
  return (
    <OrderCard userData={SAMPLE_USER_PROFILE} orderData={SAMPLE_USER_ORDER} />
  );
}

export default Home;
