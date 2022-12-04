import { useContext } from 'react';
import OrderContext, { IOrderContext } from 'contexts/Order';
import { useRouter } from 'next/router';
import Modal from 'components/Modal';
import Button from 'components/Button';
import { ORDER_CART } from 'constants/routes';

function OrderCheckoutEmptyCart() {
  const router = useRouter();
  const { order } = useContext<IOrderContext>(OrderContext);
  const { productSelected = [] } = order;
  const isNoProductSelected = productSelected.filter(Boolean).length;

  const onRedirectToCartPage = () => router.push(ORDER_CART);

  if (isNoProductSelected) {
    return null;
  }

  return (
    <Modal
      visible
      onClose={onRedirectToCartPage}
      body="Your cart is empty, please go back to cart page and try again."
      footer={(
        <div className='flex justify-end items-center gap-x-3'>
          <Button data-testid="redirect-cart-page" className='w-20' onClick={onRedirectToCartPage}>
            Ok
          </Button>
        </div>
      )}
    />
  )
}

export default OrderCheckoutEmptyCart