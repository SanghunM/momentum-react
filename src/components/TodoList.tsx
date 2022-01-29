import React, { useEffect, useState } from "react";
import TodoComponent from "./Todo";
import Todo from "../model/Todo";
import AddTodo from "./AddTodo";
import TodoPresenter from "../presenters/TodoPresenter";

interface Iprops {
  presenter: TodoPresenter;
}

interface IState {
  todos: Todo[];
  activeKey: string;
  isAddingmode: boolean;
}

const TodoList: React.FC<Iprops> = ({ presenter }) => {
  const [todos, setTodos] = useState<IState["todos"]>([]);
  const [activeKey, setActiveKey] = useState<IState["activeKey"]>("");
  const [isAddingmode, setAddingMode] = useState<IState["isAddingmode"]>(false);

  useEffect(() => {
    setTodos(presenter.todos);
  }, [presenter.todos]);

  // componentDidMount() {
  //   this.setState({
  //     todos: this.props.presenter.todos,
  //     // todos: this.props.presenter; [
  //     //   new Todo("study react"),
  //     //   new Todo("study angular"),
  //     //   new Todo("study english"),
  //     // ],
  //   });
  // }
  const updateTodo = (id: string, message: string, done?: boolean) => {
    console.log(todos);
    presenter.updateTodo(setTodos, id, message, done);
  };

  const updateActiveKey = (id: string) => {
    setActiveKey(id);
  };

  const addHandler = async (message?: string) => {
    await presenter.addHandler(setTodos, message);
    console.log("setTodos start");
  };
  const deleteHandler = (id: string) => {
    presenter.deleteHandler(setTodos, id);
  };

  const resetActiveKey = () => {
    setActiveKey("");
  };

  const renderTodoList = () => {
    if (todos.length === 0) {
      return <li>Get started on new Project!</li>;
    }
    return todos.map((todo: Todo) => (
      <TodoComponent
        key={todo.id}
        resetActiveKey={resetActiveKey}
        todo={todo}
        updateTodo={updateTodo}
        updateActiveKey={updateActiveKey}
        activeyKey={activeKey}
        deleteHandler={deleteHandler}
      />
    ));
  };
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
      {isAddingmode ? (
        <AddTodo setAddingMode={setAddingMode} addHandler={addHandler} />
      ) : (
        <>
          <ul>{renderTodoList()}</ul>
          <button
            style={{
              width: "100%",
              padding: "0.5rem",
              borderRadius: "1rem",
              border: "0",
              marginTop: "0.1rem",
              color: "white",
              backgroundColor: "red",
              cursor: "pointer",
            }}
            onClick={() => setAddingMode(true)}
          >
            add
          </button>
        </>
      )}

      {/* <AddList addList={addList} /> */}

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
};

export default TodoList;
