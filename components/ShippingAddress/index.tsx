import React from 'react';
import type { IShippingAddress } from '../../types';

interface IShippingAddressProps extends React.HTMLAttributes<HTMLDivElement> {
  firstName: string;
  lastName: string;
  shippingAddress: IShippingAddress;
}

const ShippingAddress: React.FC<IShippingAddressProps> = ({ firstName, lastName, shippingAddress }) => {
  const {
    street, city, state, postalCode, country
  } = shippingAddress;

  return (
    <div className="py-3 sm:py-5 leading-relaxed text-xs sm:text-sm">
      <h4 className="mt-1.5 mb-1 sm:mt-2.5 sm:mb-2 font-bold uppercase tracking-[0.07em]">Shipping Address</h4>
      <p className="mb-2 sm:mb-3">
        {`${firstName} ${lastName}`} <br />
        {street} <br />
        {`${city}, ${state} ${postalCode}`} <br />
        {country} <br />
      </p>
    </div>
  )
}

export default ShippingAddress