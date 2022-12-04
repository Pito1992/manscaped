import { useState } from 'react';

export interface IUseModalControllerReturn {
  isVisibleModal: boolean;
  openModal: () => void;
  closeModal: () => void;
  toggleModal: () => void;
}

function useModalController(): IUseModalControllerReturn {
  const [isVisibleModal, setToggleModal] = useState<boolean>(false);
  const openModal = () => {
    setToggleModal(true);
  }

  const closeModal = () => {
    setToggleModal(false);
  }

  const toggleModal = () => {
    setToggleModal(prevState => !prevState);
  }

  return {
    isVisibleModal, openModal, closeModal, toggleModal
  }
}

export default useModalController