import React, { PureComponent } from "react";
import TodoComponent from "./Todo";
import Todo from "../model/Todo";
import AddList from "./AddList";
import { BooleanLiteral } from "typescript";
import AddTodo from "./AddTodo";

interface IState {
  todos: Todo[];
  activeKey: string;
  isAddingmode: boolean;
}
class TodoList extends PureComponent<{}, IState> {
  state = {
    todos: [
      new Todo("study react"),
      new Todo("study angular"),
      new Todo("study english"),
    ],
    activeKey: "",
    isAddingmode: false,
  };
  renderTodoList() {
    if (this.state.todos.length == 0) {
      return <li>Get started on new Project!</li>;
    }
    return this.state.todos.map((todo: Todo) => (
      <TodoComponent
        key={todo.id}
        todo={todo}
        updateTodo={this.updateTodo}
        updateActiveKey={this.updateActiveKey}
        activeyKey={this.state.activeKey}
        deleteHandler={this.deleteHandler}
      />
    ));
  }

  updateActiveKey = (id: string) => {
    this.setState({
      activeKey: id,
    });
  };

  addList = (message: string) => {
    const newList = [...this.state.todos, new Todo(message, false)];
    this.setState({
      todos: newList,
    });
  };

  deleteHandler = (id: string) => {
    const newList = this.state.todos.filter((todo: Todo) => todo.id !== id);
    this.setState({
      todos: newList,
    });
  };

  addHandler = (message?: string) => {
    console.log(`message is ${message}`);
    if (message) {
      const newList = [...this.state.todos, new Todo(message)];
      this.setState({
        isAddingmode: !this.state.isAddingmode,
        todos: newList,
      });
    }

    this.setState({
      isAddingmode: !this.state.isAddingmode,
    });
  };

  updateTodo = (id: string, message: string, done?: boolean) => {
    const newTodos = [...this.state.todos];
    const target: Todo | undefined = newTodos.find(
      (todo: Todo) => todo.id === id
    );
    if (target) {
      if (done) {
        target.done = done;
        target.updated = new Date();
      }
      if (message) {
        target.todoMessage = message;
        target.updated = new Date();
      }
    }
    this.setState({
      todos: newTodos,
      activeKey: "",
    });
  };
  render() {
    return (
      <>
        <h1
          style={{
            margin: "1rem",
            fontSize: "1.2rem",
          }}
        >
          Today
        </h1>
        {this.state.isAddingmode ? (
          <AddTodo addHandler={this.addHandler} />
        ) : (
          <>
            <ul>{this.renderTodoList()}</ul>
            <button
              style={{
                width: "100%",
                padding: "0.5rem, 1rem",
                borderRadius: "1rem",
                border: "0",
                color: "white",
                backgroundColor: "red",
                cursor: "pointer",
              }}
              onClick={() => this.addHandler()}
            >
              add
            </button>
          </>
        )}
        {/* <AddList addList={this.addList} /> */}

        {/* <button
          style={{
            width: "100%",
            padding: "0.5rem, 1rem",
            borderRadius: "1rem",
            border: "0",
            color: "white",
            backgroundColor: "red",
            cursor: "pointer",
          }}
          onClick={() => this.addHandler()}
        >
          add
        </button> */}
      </>
    );
  }
}

export default TodoList;
