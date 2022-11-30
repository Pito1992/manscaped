import React from 'react';

interface IOrderStatusProps extends React.HTMLAttributes<HTMLDivElement> {
  statuses: string[];
}

const OrderStatus: React.FC<IOrderStatusProps> = ({ statuses }) => {
  return (
    <div className="gap-1.5 sm:gap-2.5 flex flex-wrap">
      {statuses.map((status) => (
        <div key={status} className="bg-gray-light text-gray-dark-1 px-2.5 py-1 rounded-[30px] text-xs leading-relaxed font-bold">
          {status}
        </div>
      ))}
    </div>
  )
}

export default OrderStatus