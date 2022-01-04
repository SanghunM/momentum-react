import React, { PureComponent } from "react";
import Todo from "./Todo";

class TodoList extends PureComponent {
  render() {
    return (
      <>
        <h1
          style={{
            margin: "1rem",
            fontSize: "1.2rem",
          }}
        >
          Today{" "}
        </h1>
        <ul>
          <Todo />
        </ul>
      </>
    );
  }
}

export default TodoList;
