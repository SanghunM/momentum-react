import React, { PureComponent } from "react";

interface IProps {
  //   addList: (message: string) => void;
  addHandler: (message?: string) => void;
  setAddingMode: React.Dispatch<React.SetStateAction<boolean>>;
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
    this.props.setAddingMode(false);
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
