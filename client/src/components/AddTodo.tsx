import React, { PureComponent } from "react";
import Todo from "../model/Todo";
import TodoComponent from "./Todo";
import TodoList from "./TodoList";

interface IProps {
  //   addList: (message: string) => void;
  addHandler: (message?: string) => void;
}

interface IState {
  todoMessage: string;
}
class AddTodo extends PureComponent<IProps, IState> {
  state = {
    todoMessage: "",
  };

  submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(this.state.todoMessage);
    this.props.addHandler(this.state.todoMessage);
    this.setState({
      todoMessage: "",
    });
  };

  changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      todoMessage: e.target.value,
    });
  };

  render() {
    return (
      <form
        style={{
          justifyContent: "center",
          display: "flex",
          width: "100%",
          bottom: "2rem",
        }}
        onSubmit={this.submitHandler}
      >
        <input
          type="text"
          className="add-list"
          id="name"
          placeholder="Input new list..."
          value={this.state.todoMessage}
          onChange={this.changeHandler}
        />
        <button>add</button>
      </form>
    );
  }
}

export default AddTodo;
