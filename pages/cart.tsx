import OrderCard from 'components/OrderCard';
import Breadcrumbs from 'components/Breadcrumbs';
import { ORDER_CART } from 'constants/routes';

function Cart(): JSX.Element {
  return (
    <>
      <div className="w-full max-w-[704px] mx-auto">
        <Breadcrumbs
          data={[{
            name: 'My Card',
            href: ORDER_CART
          }]}
        />
      </div>
      <OrderCard isEditable />
    </>
  );
}

export default Cart;
