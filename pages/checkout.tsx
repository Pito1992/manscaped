import OrderCard from 'components/OrderCard';
import Breadcrumbs from 'components/Breadcrumbs';
import { ORDER_CART, ORDER_CHECKOUT } from 'constants/routes';

function Checkout(): JSX.Element {
  return (
    <>
      <div className="w-full max-w-[704px] mx-auto">
        <Breadcrumbs
          data={[{
            name: 'My Card',
            href: ORDER_CART
          }, {
            name: 'Checkout',
            href: ORDER_CHECKOUT
          }]}
        />
      </div>
      <OrderCard />
    </>
  );
}

export default Checkout;
