import React from 'react';
import Modal from 'react-modal';

const CustomModal = ({ children, isOpen, handleDismiss, size = 'sm' }) => {
  const config = {
    size: {
      sm: 'modal--sm',
      md: 'modal--md',
      lg: 'modal--lg',
      fluid: 'modal--fluid',
    },
  };

  const classNames = ['modal', config.size[size]].filter(Boolean).join(' ');

  return (
    <Modal
      contentLabel="Modal"
      isOpen={isOpen}
      onRequestClose={handleDismiss}
      className={classNames}
      overlayClassName="modal-overlay"
    >
      <div className="modal-body">{children}</div>
    </Modal>
  );
};

export default CustomModal;
