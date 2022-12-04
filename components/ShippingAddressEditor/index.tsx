import React from 'react';
import UserContext, { IUserContext } from 'contexts/User';
import useModalController from 'hooks/useModalController';
import Pencil from 'assets/images/pencil.svg'
import Modal from 'components/Modal';
import Button from 'components/Button';
import Input from 'components/Input';
import type { IUserData, IShippingAddress } from 'types';

function ShippingAddressEditor() {
  const formRef = React.useRef<HTMLFormElement>(null);
  const [fields, setFields] = React.useState<IUserData>({} as IUserData)
  const { isVisibleModal, openModal, closeModal } = useModalController();
  const { user, setUser } = React.useContext<IUserContext>(UserContext);
  const { firstName, lastName, shippingAddress = {} as IShippingAddress } = user;
  const {
    street, city, state, postalCode, country
  } = shippingAddress;

  const onSave = () => {
    formRef.current?.requestSubmit();
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUser({
      ...user,
      ...fields,
      shippingAddress: {
        ...shippingAddress,
        ...fields.shippingAddress
      }
    });
    closeModal();
    setFields({} as IUserData);
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldData = {
      [e.target.name]: e.target.value
    }
    setFields({
      ...fields,
      ...(e.target.dataset.groupName === 'shippingAddress'
        ? {
          shippingAddress: {
            ...fields.shippingAddress,
            ...fieldData
          }
        }
        : fieldData
      )
    });
  }

  return (
    <>
      <button data-testid="open-shipping-address-editor" className="absolute top-0 right-0 w-5 h-5 p-0.5 hover:opacity-80" onClick={openModal}>
        <Pencil className="w-full h-full stroke-gray-dark-1" />
      </button>
      <Modal
        data-testid="modal-shipping-address-editor"
        header={
          <h4 className='text-center text-base sm:text-lg font-bold uppercase tracking-[0.07em]'>
            Shipping Address Editor
          </h4>
        }
        body={(
          <form data-testid="editor-form" ref={formRef} className="block my-3 sm:my-6" onSubmit={onSubmit}>
            <div className='grid grid-cols-2 gap-2 sm:gap-3'>
              <Input required type="text" name="firstName" onChange={onChange} label="First Name" defaultValue={firstName} />
              <Input required type="text" name="lastName" onChange={onChange} label="Last Name" defaultValue={lastName} />
              <Input required type="text" name="street" data-group-name="shippingAddress" onChange={onChange} label="Street" defaultValue={street} containerClassName="col-span-2" />
              <Input required type="text" name="city" data-group-name="shippingAddress" onChange={onChange} label="City" defaultValue={city} />
              <Input required type="text" name="state" data-group-name="shippingAddress" onChange={onChange} label="State" defaultValue={state} />
              <Input required type="text" name="country" data-group-name="shippingAddress" onChange={onChange} label="Country" defaultValue={country} />
              <Input required type="text" name="postalCode" data-group-name="shippingAddress" onChange={onChange} label="Postal Code" defaultValue={postalCode} />
            </div>
          </form>
        )}
        footer={(
          <div className='flex justify-end items-center gap-x-2 sm:gap-x-3 mt-3 sm:mt-6'>
            <Button data-testid="editor-submit" className='w-20' onClick={onSave}>
              Save
            </Button>
            <Button data-testid="editor-cancel" className='w-20' onClick={closeModal}>
              Cancel
            </Button>
          </div>
        )}
        visible={isVisibleModal}
        onClose={closeModal}
      />
    </>
  )
}

export default ShippingAddressEditor;