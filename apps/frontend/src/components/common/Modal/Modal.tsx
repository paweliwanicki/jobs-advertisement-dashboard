import { ReactNode } from 'react';
import ReactModal from 'react-modal';
import classes from './Modal.module.scss';
import closeIcon from '../../../assets/icons/close.svg';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
};
const Modal = ({ isOpen, children, onClose }: ModalProps) => {
  return (
    <ReactModal
      isOpen={isOpen}
      className={classes.modal}
      overlayClassName={classes.overlay}
      onRequestClose={onClose}
    >
      <img src={closeIcon} className={classes.closeIcon} onClick={onClose} />
      {children}
    </ReactModal>
  );
};

export default Modal;
