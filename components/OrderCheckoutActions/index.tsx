import { useRouter } from 'next/router';
import OrderAction from 'components/OrderAction';
import { ORDER_CART } from 'constants/routes';

function OrderCheckoutActions() {
  const router = useRouter();

  const onCancel = () => router.push(ORDER_CART);

  return (
    <>
      <OrderAction title="Cancel" body="Are you sure to cancel?" onClick={onCancel} />
      <OrderAction title="Refund" body="Consectetur adipisicing elit." />
      <OrderAction title="Resend Confirmation" body="Repudiandae, cum. Saepe, est!" />
      <OrderAction title="Resend Tracking" body="Iste blanditiis nostrum unde dolores architecto fugiat voluptatum." />
    </>
  )
}

export default OrderCheckoutActions