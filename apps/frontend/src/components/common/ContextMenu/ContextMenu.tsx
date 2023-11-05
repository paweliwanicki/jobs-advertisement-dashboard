import { ReactNode, useCallback, useEffect, useState } from 'react';
import classes from './ContextMenu.module.scss';
import SvgIcon from '../SvgIcon/SvgIcon';
import { useMotionAnimate } from 'motion-hooks';

export type ContextMenuOption = {
  label: ReactNode;
  action?: () => void;
};

type ContextMenuProps = {
  id: string;
  iconId?: string;
  options: ContextMenuOption[];
};

const ContextMenu = ({ options, id, iconId }: ContextMenuProps) => {
  const { play: openAnimation } = useMotionAnimate(
    `#${id} .${classes.optionsList}`,
    { height: 'auto' },
    {
      duration: 0.5,
      easing: [0.22, 0.03, 0.26, 1],
    }
  );

  const { play: closeAnimation } = useMotionAnimate(
    `#${id} .${classes.optionsList}`,
    { height: '0px' },
    {
      duration: 0.5,
      easing: [0.22, 0.03, 0.26, 1],
    }
  );

  const { play: openMenuAnimation } = useMotionAnimate(
    `#${id} .${classes.option}`,
    { opacity: 1, height: 'fit-content' },
    {
      duration: 0.5,
      easing: [0.22, 0.03, 0.26, 1],
    }
  );

  const { play: closeMenuAnimation } = useMotionAnimate(
    `#${id} .${classes.option}`,
    { opacity: 0, height: '0' },
    {
      duration: 0.2,
      easing: [0.22, 0.03, 0.26, 1],
    }
  );

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSetIsOpen = useCallback(() => {
    setIsOpen((open) => !open);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      openAnimation();
      openMenuAnimation();
    } else {
      closeAnimation();
      closeMenuAnimation();
    }
  }, [isOpen]);

  return (
    <div id={id} className={classes.contextMenuBox}>
      <SvgIcon
        id={iconId ? iconId : 'icon-settings'}
        width={24}
        height={24}
        onClick={handleSetIsOpen}
      />

      <div className={classes.optionsList}>
        {options.map((option: ContextMenuOption) => {
          return (
            <div onClick={option.action} className={classes.option}>
              <p>{option.label}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ContextMenu;
