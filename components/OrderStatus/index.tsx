import React from 'react';
import OrderContext, { IOrderContext } from 'contexts/Order';

interface IOrderStatusProps extends React.HTMLAttributes<HTMLDivElement> {}

const OrderStatus: React.FC<IOrderStatusProps> = () => {
  const { order } = React.useContext<IOrderContext>(OrderContext);
  const { statuses = [] } = order;

  return (
    <div data-testid="status" className="gap-1.5 sm:gap-2.5 flex flex-wrap">
      {statuses.map((status) => (
        <div key={status} className="bg-gray-light text-gray-dark-1 px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-[30px] text-xs leading-relaxed font-bold">
          {status}
        </div>
      ))}
    </div>
  )
}

export default OrderStatus