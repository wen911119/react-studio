import React, { FC } from "react"; 
import px2rem from "p-to-r";
import * as CSS from 'csstype';

type P2R = string | number;
interface TextProps {
  size?: P2R,
  color?: string,
  weight?: P2R,
  style?: CSS.Properties,
  lineHeight?: string,
}

const Text: FC<TextProps> = ({
  children,
  size = 30,
  color = "#333",
  weight = "initial",
  style,
  lineHeight = "normal",
  ...otherProps
}) => (
  <span
    {...otherProps}
    style={Object.assign(
      {
        color,
        fontSize: px2rem(size),
        fontWeight: weight,
        lineHeight,
      },
      style
    )}
  >
    {children}
  </span>
);
export default Text;
