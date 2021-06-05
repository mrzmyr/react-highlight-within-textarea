import React, { useState, useEffect } from "react";
import Example from "./Example.js";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

const text = (
  <span>
    You can use a component to wrap each highlighted span. 
    This exposes the underlying{" "}
    <a href="https://draftjs.org/">Draft.js</a>{" "}
    <a href="https://draftjs.org/docs/advanced-topics-decorators/#decorator-components">
      compositeDecorator
    </a>{" "}
    strategy. 
  </span>
);

const initialValue = `Here's a blueberry. There's a strawberry.  I'm a little blue because there is a highlight bug where a blueberry's highlight gets split over line breaks in Chrome incorrectly.  This makes me berry sad.
But the blues go away after a newline is forced.`;

const code = `const ToolTip = (props) => {
  const objects = { contentState: "(...)", children: "(...)" };
  const content = <pre>{JSON.stringify({ ...props, ...objects }, 0, 1)}</pre>;
  return (
    <Tippy content={content}>
      <mark>{props.children}</mark>
    </Tippy>
  );
}

const MultiColor = (props) => {
  const [color, setColor] = useState(0xff8800);
  const colorText = \`#\${color.toString(16)}\`;

  useEffect(() => {
    const recolor = () => setColor(0x808080 | (color + 0x081018) % 0xffffff);
    const timer = setInterval(recolor, 200);
    return () => clearInterval(timer);
  });
  return <mark style={{ backgroundColor: colorText }}>{props.children}</mark>;
};

const highlight = [
  {
    component: MultiColor,
    highlight: "blue",
  },
  {
    highlight: /[^ ]*berry/gi,
    component: ToolTip,
    className: "yellow",
  },
];

const ComponentDemo = (props) => {
  return (
    <HighlightWithinTextarea
      highlight={highlight}
      ...
    />
  );
};`;

const ToolTip = (props) => {
  const objects = { contentState: "(...)", children: "(...)" };
  const content = <pre>{JSON.stringify({ ...props, ...objects }, 0, 1)}</pre>;
  return (
    <Tippy content={content}>
      <mark>{props.children}</mark>
    </Tippy>
  );
};

const MultiColor = (props) => {
  const [color, setColor] = useState(0xff8800);
  const colorText = `#${color.toString(16)}`;

  useEffect(() => {
    const recolor = () => setColor(0x808080 | (color + 0x081018) % 0xffffff);
    const timer = setInterval(recolor, 200);
    return () => clearInterval(timer);
  });
  return <mark style={{ backgroundColor: colorText }}>{props.children}</mark>;
};

const highlight = [
  {
    component: MultiColor,
    highlight: "blue",
  },
  {
    highlight: /[^ ]*berry/gi,
    component: ToolTip,
    className: "yellow",
  },
];

const Component = () => {
  return (
    <Example
      title={"Custom Object with Decorator Components"}
      text={text}
      initialValue={initialValue}
      highlight={highlight}
      code={code}
    />
  );
};

export default Component;