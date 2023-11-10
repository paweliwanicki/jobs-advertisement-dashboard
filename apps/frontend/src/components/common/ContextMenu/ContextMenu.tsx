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
  options: ContextMenuOption[];
  classNames?: string;
  iconId?: string;
  width?: number;
  height?: number;
};

const ContextMenu = ({
  options,
  id,
  iconId,
  classNames = '',
  width = 24,
  height = 24,
}: ContextMenuProps) => {
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

  const handleOptionAction = useCallback((option: ContextMenuOption) => {
    option && option.action?.();
    setIsOpen((open) => !open);
  }, []);

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
    <div id={id} className={`${classNames} ${classes.contextMenuBox}`}>
      <SvgIcon
        id={iconId ? iconId : 'icon-settings'}
        width={width}
        height={height}
        onClick={handleSetIsOpen}
      />

      <ul className={classes.optionsList} style={{ top: height + 5 }}>
        {options.map((option: ContextMenuOption, index: number) => {
          return (
            <li
              onClick={() => handleOptionAction(option)}
              className={classes.option}
              key={`${index}-${option.label}`}
            >
              <p>{option.label}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ContextMenu;
