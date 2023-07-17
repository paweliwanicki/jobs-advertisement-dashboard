import { ReactNode } from 'react';
import ReactModal from 'react-modal';
import classes from './Modal.module.scss';
import SvgIcon from '../SvgIcon/SvgIcon';

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
      appElement={document.body}
    >

      <SvgIcon id='icon-close' classNames={classes.closeIcon} onClick={onClose} width={32} height={32} />
     
      {children}
    </ReactModal>
  );
};

export default Modal;
