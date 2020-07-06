import { FC, CSSProperties } from "react";
declare type P2R = string | number;
interface TextProps {
    size?: P2R;
    color?: string;
    weight?: P2R;
    style?: CSSProperties;
    lineHeight?: string;
}
declare const Text: FC<TextProps>;
export default Text;
