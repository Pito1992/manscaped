import React, { useContext } from 'react';
import UserContext, { IUserContext } from 'contexts/User';
import ShippingAddressEditor from 'components/ShippingAddressEditor';
import type { IShippingAddress } from 'types';

interface IShippingAddressProps extends React.HTMLAttributes<HTMLDivElement> {
  isEditable?: boolean;
}

const ShippingAddress: React.FC<IShippingAddressProps> = ({
  isEditable
}) => {
  const { user } = useContext<IUserContext>(UserContext);
  const { firstName, lastName, shippingAddress = {} as IShippingAddress } = user;
  const {
    street, city, state, postalCode, country
  } = shippingAddress;

  return (
    <div className="relative leading-relaxed text-xs sm:text-sm">
      <h4 className="mt-1.5 mb-1 sm:mt-2.5 sm:mb-2 font-bold uppercase tracking-[0.07em]">Shipping Address</h4>
      <p className="mb-2 sm:mb-3">
        {`${firstName} ${lastName}`} <br />
        {street} <br />
        {`${city}, ${state} ${postalCode}`} <br />
        {country} <br />
      </p>
      {isEditable && <ShippingAddressEditor />}
    </div>
  )
}

export default ShippingAddress