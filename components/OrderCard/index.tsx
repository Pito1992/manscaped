import React from 'react';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import OrderContext, { IOrderContext } from 'contexts/Order';
import { TIME_FORMAT } from 'constants/order';
import OrderStatus from 'components/OrderStatus';
import ProductTable from 'components/ProductTable';
import ShippingAddress from 'components/ShippingAddress';
import OrderCardActions from 'components/OrderCardActions';
import OrderCheckoutActions from 'components/OrderCheckoutActions';
import OrderCheckoutEmptyCart from 'components/OrderCheckoutEmptyCart';

dayjs.extend(advancedFormat);

interface IOrderCard {
  isEditable?: boolean;
}

function OrderCard({ isEditable }: IOrderCard): JSX.Element {
  const { order } = React.useContext<IOrderContext>(OrderContext);
  const { id: orderId, createdAt, lastUpdatedAt } = order;

  return (
    <div className="container font-secondary">
      <div className="w-full max-w-[704px] mt-5 mx-auto">
        <header className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between px-3 sm:px-0">
          <h4 className="flex items-center text-base sm:text-lg leading-normal mb-2 sm:mb-0">
            <span className="font-bold">Order</span>&nbsp;{orderId}&nbsp;
          </h4>
          <div className="flex flex-col whitespace-nowrap sm:text-right text-xs sm:text-sm leading-normal">
            <span>
              {`Created on ${dayjs(createdAt).format(TIME_FORMAT)}`}
            </span>
            <span>
              {`Last updated on ${dayjs(lastUpdatedAt).format(TIME_FORMAT)}`}
            </span>
          </div>
        </header>
        <div className="bg-white p-3 sm:p-6">
          <ProductTable isEditable={isEditable} />
          <div className='py-3 sm:py-5'>
            <ShippingAddress isEditable={isEditable} />
            <OrderStatus />
          </div>
          <hr className="border-solid border-gray" />
        </div>
        <div className="bg-white px-3 sm:px-6 pb-3 sm:pb-6">
          <div className="whitespace-nowrap flex flex-wrap gap-2">
            {isEditable ? (
              <OrderCardActions />
            ) : (
              <>
                <OrderCheckoutActions />
                <OrderCheckoutEmptyCart />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderCard;
