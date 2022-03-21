import React from "react";

interface CaptureProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {}

/**
 * First you need to import 
 ```js
 import { Capture } from "screenshot";
 ```
 After that you can use this component like this
```
const DemoComponent = () => {
  return (
    <Capture className="center">
      <div>
        <h1>I am inside Capture </h1>
      </div>
    </Capture>
  );
};

export default DemoComponent;
```
 */

const Capture = React.forwardRef<HTMLDivElement, CaptureProps>((props, ref) =>
  React.createElement("div", { ref: ref, ...props })
);

export default Capture;
