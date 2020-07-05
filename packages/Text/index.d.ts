import { FC } from "react";
import * as CSS from 'csstype';
declare type P2R = string | number;
interface TextProps {
    size?: P2R;
    color?: string;
    weight?: P2R;
    style?: CSS.Properties;
    lineHeight?: string;
}
declare const Text: FC<TextProps>;
export default Text;
