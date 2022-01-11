import React, { PureComponent } from "react";
import { BooleanLiteral } from "typescript";
import Todo from "../model/Todo";

interface IProps {
  todo: Todo;
  updateTodo: (id: string, message: string, done?: boolean) => void;
  updateActiveKey: (id: string) => void;
  activeyKey: string;
  deleteHandler: (id: string) => void;
}

interface IState {
  todoMessage: string;
  done: boolean;
  isEdit: boolean;
}

class TodoComponent extends PureComponent<IProps> {
  state = {
    todoMessage: this.props.todo.todoMessage,
    done: false,
    isEdit: false,
  };

  //every input tag receives event at default
  doneHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      done: e.target.checked,
    });
    this.props.updateTodo(this.props.todo.id, "", e.target.checked);
  };

  updateHandler = () => {
    this.setState(
      {
        isEdit: !this.state.isEdit,
      },
      () => {
        if (this.state.isEdit) {
          this.props.updateActiveKey(this.props.todo.id);
        }
      }
    );
  };

  deleteHandle = () => {};

  submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.props.updateTodo(this.props.todo.id, this.state.todoMessage);
    this.updateHandler();
  };

  messageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      todoMessage: e.target.value,
    });
  };

  render() {
    const isEditable =
      this.props.activeyKey === this.props.todo.id || !this.props.activeyKey;
    const { updated } = this.props.todo;
    const TextComponent = (
      <>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <input
            type="checkbox"
            id={this.props.todo.id}
            style={{ marginRight: "0.5rem" }}
            checked={this.state.done}
            onChange={this.doneHandler}
            disabled={!isEditable}
          />
        </div>
        <div
          style={{
            display: "flex",
            flex: "1",
            justifyContent: "space-between",
          }}
        >
          <label
            htmlFor={this.props.todo.id}
            style={{
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",
              width: "240px",
            }}
          >
            <span>{this.state.todoMessage}</span>
            <span style={{ marginRight: "0.5rem", marginLeft: "0.5rem" }}>
              -
            </span>
            <span>{updated.toDateString()}</span>
          </label>

          <span>
            <button
              style={{
                backgroundColor: "transparent",
                color: isEditable ? "white" : "gray",
                border: 0,
                fontSize: "1rem",
                cursor: isEditable ? "pointer" : "",
              }}
              onClick={this.updateHandler}
              disabled={!isEditable}
            >
              <i className="fas fa-user-edit"></i>
            </button>

            <button
              style={{
                backgroundColor: "transparent",
                color: isEditable ? "white" : "gray",
                border: 0,
                fontSize: "1rem",
                cursor: isEditable ? "pointer" : "",
              }}
              onClick={() => this.props.deleteHandler(this.props.todo.id)}
              disabled={!isEditable}
            >
              <i className="fas fa-trash-alt"></i>
            </button>
          </span>
        </div>
      </>
    );

    const EditComponent = (
      <form
        style={{
          display: "flex",
          width: "100%",
        }}
        onSubmit={this.submitHandler}
      >
        <input
          type="text"
          style={{
            justifyContent: "center",
            height: "2rem",
            padding: "left",
            flex: "1",
            borderRadius: "20px",
            border: "0",
            marginRight: "1rem",
          }}
          value={this.state.todoMessage}
          onChange={this.messageHandler}
        />
        <button
          type="submit"
          style={{
            backgroundColor: "transparent",
            color: "white",
            border: 0,
            fontSize: "1rem",
            cursor: isEditable ? "pointer" : "",
          }}
          disabled={!isEditable}
        >
          Edit
        </button>
      </form>
    );

    return (
      <li
        style={{
          height: "40px",
          display: "flex",
          lineHeight: "40px",
          color: isEditable ? "white" : "gray",
          flexDirection: "row",
          textDecoration: `${this.state.done ? "line-through" : "unset"}`,
        }}
      >
        {this.state.isEdit ? EditComponent : TextComponent}
      </li>
    );
  }
}

export default TodoComponent;
