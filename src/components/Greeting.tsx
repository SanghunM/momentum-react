import React, { PureComponent } from "react";

class Greeting extends PureComponent {
  render() {
    return (
      <h1
        style={{
          fontSize: "1.5rem",
        }}
      >
        Good Morning, Sanghun!
      </h1>
    );
  }
}

export default Greeting;
