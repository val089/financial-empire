import { useCallback, useState } from 'react';

const useModal = () => {
  const [visible, setVisible] = useState(false);

  const closeModal = useCallback(() => {
    setVisible(false);
  }, []);

  const openModal = useCallback(() => {
    setVisible(true);
  }, []);

  const toggleModal = useCallback(() => {
    setVisible((prevState) => !prevState);
  }, []);

  return {
    visible,
    closeModal,
    openModal,
    toggleModal,
  };
};

export default useModal;
