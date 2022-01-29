import { stringify } from "querystring";
import React from "react";
import Todo from "../model/Todo";

type UpdateType = {
  todos: React.Dispatch<React.SetStateAction<Todo[]>>;
  activeKey: React.Dispatch<React.SetStateAction<string>>;
  isAddingmode: React.Dispatch<React.SetStateAction<boolean>>;
};

class TodoPresenter {
  constructor(private todos_: Todo[], private isAddingmode_: boolean = false) {}

  get todos() {
    return this.todos_;
  }

  get isAddingmode() {
    return this.isAddingmode_;
  }

  addHandler = async (
    todoupdate: UpdateType["todos"],

    message?: string
  ): Promise<any> => {
    if (message) {
      const { todo } = await this.addToDB(message);
      // console.log("todo is", todo);
      const newTodos = [
        ...this.todos_,
        new Todo(
          todo._id,
          todo.message,
          todo.done,
          new Date(todo.created),
          new Date(todo.updated)
        ),
      ];
      console.log(this.todos_, this.todos_ === newTodos);
      todoupdate(this.todos_);
    }
    this.isAddingmode_ = !this.isAddingmode_;
  };

  addToDB(message: string): Promise<any> {
    const formData = new FormData();
    formData.append("content", message);
    return fetch("http://localhost:8000/todo", {
      method: "POST",

      // mode: "cors",
      // cache: "no-cache",
      // credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: message,
      }),
    }).then((res) => res.json());
  }

  deleteHandler = async (update: UpdateType["todos"], id: string) => {
    await this.deleteToDB(id);
    this.todos_ = this.todos_.filter((todo: Todo) => todo.id !== id);
    update(this.todos_);
  };

  deleteToDB(id: string): Promise<any> {
    return fetch(`http://localhost:8000/todo/${id}`, {
      method: "DELETE",

      // mode: "cors",
      // cache: "no-cache",
      // credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  }

  updateTodo = async (
    update: UpdateType["todos"],
    id: string,
    message: string,
    done: boolean = false
  ) => {
    this.todos_ = [...this.todos_];
    const { todo } = await this.updateToDb(id, message, done);
    const index = this.todos_.findIndex((todo: Todo) => todo.id === id);
    console.log(todo);
    update([
      ...this.todos.slice(0, index),
      new Todo(
        todo._id,
        todo.message,
        todo.done,
        new Date(todo.created),
        new Date(todo.updated)
      ),
      ...this.todos.slice(index + 1),
    ]);
  };

  updateToDb(id: string, message: string, done: boolean): Promise<any> {
    // const formData = new FormData();
    // formData.append("content", message);
    // formData.append("id", id);
    // formData.append("done", String(done));
    return fetch(`http://localhost:8000/todo/${id}`, {
      method: "PUT",

      // mode: "cors",
      // cache: "no-cache",
      // credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: message,
        done: done,
      }),
    }).then((res) => res.json());
  }
}

export default TodoPresenter;
