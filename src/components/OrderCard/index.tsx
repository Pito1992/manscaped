import React from 'react';
import dayjs from 'dayjs';
import advancedFormat from "dayjs/plugin/advancedFormat";
import { TIME_FORMAT } from '../../constants/order';
import OrderStatus from '../../components/OrderStatus';
import ProductTable from '../../components/ProductTable';
import ShippingAddress from '../../components/ShippingAddress';
import Button from '../../components/Button';
import type { IUserData, IOrderData } from '../../types';

dayjs.extend(advancedFormat);

interface IOrderCard {
  userData: IUserData
  orderData: IOrderData
}

function OrderCard({
  userData, orderData
}: IOrderCard): JSX.Element {
  const { id: orderId, statuses, productList, createdAt, lastUpdatedAt, currency } = orderData;
  const { firstName, lastName, shippingAddress } = userData;
  return (
    <div className="container font-secondary">
      <div className="w-full max-w-[704px] mt-5 mx-auto">
        <header className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between px-3 sm:px-0">
          <h4 className="text-normal sm:text-lg leading-normal mb-2 sm:mb-0"><span className="font-bold">Order</span> {orderId}</h4>
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
          <ProductTable productList={productList} currency={currency} />
          <div className='py-3 sm:py-5'>
            <ShippingAddress firstName={firstName} lastName={lastName} shippingAddress={shippingAddress} />
            <OrderStatus statuses={statuses} />
          </div>
          <hr className="border-solid border-gray" />
          <div className="whitespace-nowrap flex flex-wrap gap-2 sm:gap-3 mt-3 sm:mt-6">
            <Button>
              Cancel
            </Button>
            <Button>
              Refund
            </Button>
            <Button>
              Resend Confirmation
            </Button>
            <Button>
              Resend Tracking
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderCard;
