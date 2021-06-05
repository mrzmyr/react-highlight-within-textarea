import React from "react";
import Example from "./Example.js";

const Regexp = () => {
  return (
    <>
      <h2></h2>
      <span>
        Don't forget the <code>g</code> (find all) and <code>i</code>{" "}
        (case-insensitive) flags if you need them.
      </span>
      <Example
        title="RegExp"
        text={
          <span>
            Don't forget the <code>g</code> (find all) and <code>i</code>{" "}
            (case-insensitive) flags if you need them.
      </span>
        }
        initialValue="Dog, cat, chicken, goose. Dogs, cats, chickens, geese."
        highlight={/dogs?|cats?|g(oo|ee)se/gi}
        code={`highlight={/dogs?|cats?|g(oo|ee)se/gi}`}
      ></Example>
    </>
  );
};

export default Regexp;