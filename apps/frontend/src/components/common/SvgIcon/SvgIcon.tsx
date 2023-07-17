import { useState, useEffect, useCallback } from "react";
import svgSprite from "../../../assets/sprite.svg";

type SvgIconProps = {
  id: string;
  elementId?: string;
  classNames?: string;
  height?: number;
  width?: number;
  color?: string;
  hoverColor?: string;
  viewBox?: string;
  onClick?: () => void;
};

const SvgIcon = ({
  id,
  elementId,
  classNames,
  height = 24,
  width = 24,
  color = "",
  hoverColor = "",
  viewBox = `0 0 ${width} ${height}`,
  onClick,
}: SvgIconProps) => {
  const [fill, setFill] = useState<string>(color);

  const onMouseEnterHandler = useCallback(() => {
    setFill(hoverColor);
  }, [hoverColor]);

  const onMouseLeaveHandler = useCallback(() => {
    setFill(color);
  }, [color]);

  // set color if props.color has been changed
  useEffect(() => {
    setFill(color);
  }, [color]);

  return (
    <svg
      id={elementId}
      width={width}
      height={height}
      viewBox={viewBox}
      fill={fill}
      onMouseEnter={onMouseEnterHandler}
      onMouseLeave={onMouseLeaveHandler}
      //data-id={id}
      className={classNames}
      onClick={onClick}
    >
      <use href={svgSprite + `#${id}`} />
    </svg>
  );
};

export default SvgIcon;
