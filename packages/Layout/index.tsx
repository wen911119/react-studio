import React, { FC } from "react";
import px2rem from "p-to-r";
import * as CSS from 'csstype';
const layout = require("./layout.css");

const styleEl = document.createElement("style");
let injectedStyle = "";
for (let i = 1; i <= 500; i++) {
  injectedStyle += `.child-mgr-${i}>*{margin-right:${px2rem(
    i
  )}}.child-mgb-${i}>*{margin-bottom:${px2rem(i)}}`;
}
styleEl.innerHTML = injectedStyle;
document.head.appendChild(styleEl);

interface StyleParserParams {
  padding?: P2R[];
  margin?: P2R[];
  bgColor?: string;
  width?: P2R;
  height?: P2R;
}
const styleParser = ({
  padding,
  margin,
  bgColor,
  width,
  height,
}: StyleParserParams): CSS.Properties => {
  let composeStyle: CSS.Properties = {};
  if (padding) {
    composeStyle = Object.assign(composeStyle, {
      paddingTop: px2rem(padding[0]),
      paddingRight: px2rem(padding[1]),
      paddingBottom: px2rem(padding[2]),
      paddingLeft: px2rem(padding[3]),
    });
  }
  if (margin) {
    composeStyle = Object.assign(composeStyle, {
      marginTop: px2rem(margin[0]),
      marginRight: px2rem(margin[1]),
      marginBottom: px2rem(margin[2]),
      marginLeft: px2rem(margin[3]),
    });
  }
  if (bgColor) {
    composeStyle.backgroundColor = bgColor;
  }
  if (width) {
    composeStyle.width = px2rem(width);
  }
  if (height) {
    composeStyle.height = px2rem(height);
  }
  return composeStyle;
};

interface ClassNameParser {
  vAlign?: ValignOptions;
  hAlign?: HalignOptions;
  className?: string;
}

type ClassNameParserType = "rowview" | "columnview";

const classNameParser = (type: ClassNameParserType) => ({
  vAlign,
  hAlign,
  className,
}: ClassNameParser): string => {
  let classNames = [layout[type]];
  if (vAlign) {
    const classObject = layout[`${type}-v-${vAlign}`];
    classObject && classNames.push(classObject);
  }
  if (hAlign) {
    const classObject = layout[`${type}-h-${hAlign}`];
    classObject && classNames.push(classObject);
  }
  if (className) {
    classNames.push(className);
  }
  return classNames.join(" ");
};

function alternateInsert(arr: any, item: any) {
  let insertedArr = arr.reduce(
    (all: any, current: any) => all.concat(current, item),
    []
  );
  insertedArr.pop();
  return insertedArr;
}

type ValignOptions = "top" | "center" | "bottom";

type HalignOptions = "left" | "center" | "right" | "around" | "between";

type P2R = string | number;

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

export const RowView: FC<ViewProps> = ({
  children,
  vAlign,
  hAlign,
  height,
  width,
  bgColor,
  padding,
  margin,
  style = {},
  className,
  ...otherProps
}) => {
  const classNames = classNameParser("rowview")({ vAlign, hAlign, className });
  const composeStyle = styleParser({ padding, margin, bgColor, width, height });
  return (
    <div
      {...otherProps}
      className={classNames}
      style={Object.assign(composeStyle, style)}
    >
      {children}
    </div>
  );
};

export const ColumnView: FC<ViewProps> = ({
  children,
  vAlign,
  hAlign,
  padding,
  margin,
  bgColor,
  width,
  height,
  style = {},
  className,
  ...otherProps
}) => {
  const classNames = classNameParser("columnview")({
    vAlign,
    hAlign,
    className,
  });
  const composeStyle = styleParser({ padding, margin, bgColor, width, height });
  return (
    <div
      {...otherProps}
      className={classNames}
      style={Object.assign(composeStyle, style)}
    >
      {children}
    </div>
  );
};

export const XCenterView: FC<XCenterViewProps> = ({
  className,
  children,
  style = {},
  height,
  width,
  bgColor,
  ...otherProps
}) => {
  let classNames = layout.xcenter;
  if (className) {
    classNames = classNames + " " + className;
  }
  const composeStyle = styleParser({ bgColor, width, height });
  return (
    <div
      {...otherProps}
      className={classNames}
      style={Object.assign(composeStyle, style)}
    >
      {children}
    </div>
  );
};

export const SpaceHolder: FC<{ width?: P2R; height?: P2R }> = ({
  width = 0,
  height = 0,
}) => <div style={{ width: px2rem(width), height: px2rem(height) }} />;

export const SlotRowView: FC<SlotViewProps> = ({
  slot,
  legacy,
  children,
  className,
  ...otherProps
}) => {
  let allChildren = children;
  let _className = className;
  if (children && React.Children.toArray(children).length && slot) {
    if (typeof slot === "string" || legacy) {
      // typeof string 是为了支持pc上直接传15px这种
      // legacy模式保留旧的插div占空间的模式
      allChildren = alternateInsert(
        children,
        <SpaceHolder width={slot as P2R} />
      );
    } else if (typeof slot === "number") {
      _className = className ? className + " " : "";
      _className = _className + `child-mgr-${slot} ${layout.slotrowview}`;
    } else {
      allChildren = alternateInsert(children, slot);
    }
  }
  return (
    <RowView {...otherProps} className={_className}>
      {allChildren}
    </RowView>
  );
};

export const SlotColumnView: FC<SlotViewProps> = ({
  slot,
  legacy,
  className,
  children,
  ...otherProps
}) => {
  let allChildren = children;
  let _className = className;
  if (children && React.Children.toArray(children).length && slot) {
    if (typeof slot === "string" || legacy) {
      // 保留旧的插div占空间的模式
      allChildren = alternateInsert(
        children,
        <SpaceHolder height={slot as P2R} />
      );
    } else if (typeof slot === "number") {
      _className = className ? className + " " : "";
      _className = _className + `child-mgb-${slot} ${layout.slotcolumnview}`;
    } else {
      allChildren = alternateInsert(children, slot);
    }
  }
  return (
    <ColumnView {...otherProps} className={_className}>
      {allChildren}
    </ColumnView>
  );
};
