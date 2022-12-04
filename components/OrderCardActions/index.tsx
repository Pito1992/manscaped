import { useContext } from 'react';
import Button from 'components/Button';
import Modal from 'components/Modal';
import OrderContext, { IOrderContext } from 'contexts/Order';
import { ORDER_CHECKOUT } from 'constants/routes';
import useModalController from 'hooks/useModalController';
import { useRouter } from 'next/router';

function OrderCardActions() {
  const router = useRouter();
  const { isVisibleModal, openModal, closeModal } = useModalController();
  const { order, setOrder } = useContext<IOrderContext>(OrderContext);
  const { productSelected = [] } = order;
  const isNoProductSelected = productSelected.filter(Boolean).length;

  const onCheckout = () => {
    if (isNoProductSelected) {
      const lastUpdatedAt = Date.now();
      setOrder({
        ...order,
        lastUpdatedAt,
        isDirty: false
      });
      setTimeout(() => {
        router.push(ORDER_CHECKOUT)
      });
    } else {
      openModal();
    }
  };

  return (
    <>
      <Button data-testid="check-out" onClick={onCheckout}>
        Check out
      </Button>
      <Modal
        data-testid="modal"
        header={<h4 className='text-center text-normal sm:text-lg font-bold uppercase tracking-[0.07em]'>No Selected Product</h4>}
        body="You have not selected any items for checkout"
        footer={(
          <div className='flex justify-end items-center gap-x-3'>
            <Button data-testid="modal-ok" className='w-20' onClick={closeModal}>
              Ok
            </Button>
          </div>
        )}
        visible={isVisibleModal}
        onClose={closeModal}
      />
    </>
  )
}

export default OrderCardActions