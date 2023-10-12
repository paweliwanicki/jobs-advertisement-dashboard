import { ReactNode, useCallback } from 'react';
import ReactModal from 'react-modal';
import classes from './Modal.module.scss';
import SvgIcon from '../SvgIcon/SvgIcon';
import { useMotionAnimate } from 'motion-hooks';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
};
const Modal = ({ isOpen, children, onClose }: ModalProps) => {
  const { play: openAnimation } = useMotionAnimate(
    `.${classes.modal}`,
    { width: '600px', height: '70%', fontSize: '1em', opacity: 1 },
    {
      duration: 0.5,
      easing: [0.22, 0.03, 0.26, 1],
    }
  );

  const { play: closeAnimation } = useMotionAnimate(
    `.${classes.modal}`,
    { width: '0', height: '0', fontSize: '0', opacity: 0 },
    {
      duration: 0.5,
      easing: [0.22, 0.03, 0.26, 1],
    }
  );

  const handleModalClose = useCallback(() => {
    closeAnimation()
      .then(() => onClose())
      .catch((err) => console.error(err));
  }, [closeAnimation, onClose]);

  return (
    <ReactModal
      isOpen={isOpen}
      className={classes.modal}
      overlayClassName={classes.overlay}
      onRequestClose={handleModalClose}
      appElement={document.body}
      onAfterOpen={() => void openAnimation()}
    >
      <SvgIcon
        id="icon-close-dark"
        classNames={classes.closeIcon}
        onClick={handleModalClose}
        width={32}
        height={32}
      />

      {children}
    </ReactModal>
  );
};

export default Modal;
