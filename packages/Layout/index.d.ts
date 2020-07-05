import { FC } from "react";
import * as CSS from 'csstype';
declare type ValignOptions = "top" | "center" | "bottom";
declare type HalignOptions = "left" | "center" | "right" | "around" | "between";
declare type P2R = string | number;
interface XCenterViewProps {
    height?: P2R;
    width?: P2R;
    bgColor?: string;
    className?: string;
    style?: CSS.Properties;
}
interface ViewProps extends XCenterViewProps {
    vAlign?: ValignOptions;
    hAlign?: HalignOptions;
    padding?: P2R[];
    margin?: P2R[];
}
interface SlotViewProps extends ViewProps {
    slot?: P2R | FC;
    legacy?: boolean;
}
export declare const RowView: FC<ViewProps>;
export declare const ColumnView: FC<ViewProps>;
export declare const XCenterView: FC<XCenterViewProps>;
export declare const SpaceHolder: FC<{
    width?: P2R;
    height?: P2R;
}>;
export declare const SlotRowView: FC<SlotViewProps>;
export declare const SlotColumnView: FC<SlotViewProps>;
export {};
