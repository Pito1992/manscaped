import React from 'react';
import Modal from 'components/Modal';
import Button from 'components/Button';
import useModalController from 'hooks/useModalController';

interface IOrderActionProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  body: React.ReactNode;
  onClick?: () => void;
}

const OrderAction: React.FC<IOrderActionProps> = ({
  title, body, onClick
}) => {
  const { isVisibleModal, openModal, closeModal } = useModalController();

  return (
    <>
      <Button data-testid="open-modal" title={title} onClick={openModal}>
        {title}
      </Button>
      <Modal
        data-testid="modal"
        header={<h4 className='text-center text-normal sm:text-lg font-bold uppercase tracking-[0.07em]'>{title}</h4>}
        body={body}
        footer={(
          <div className='flex justify-end items-center gap-x-3'>
            <Button data-testid="modal-ok" className='w-20' onClick={onClick || closeModal}>
              Ok
            </Button>
            <Button data-testid="modal-cancel" className='w-20' onClick={closeModal}>
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

export default OrderAction