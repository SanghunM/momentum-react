import TodoPresenter from "./TodoPresenter";
import Todo from "../model/Todo";
describe("TodoPresenter", () => {
  let presenter: TodoPresenter;
  let update: jest.Mock<any, any>;
  let update2: jest.Mock<any, any>;
  const mockTodos: Todo[] = [
    new Todo("7", "study react"),
    new Todo("1", "study JS"),
  ];
  beforeEach(() => {
    presenter = new TodoPresenter(mockTodos);
    update = jest.fn();
    update2 = jest.fn();
  });

  it("initialize with todos", () => {
    expect(presenter.todos).toEqual(mockTodos);
  });

  describe("updateTodo", () => {
    beforeEach(() => {
      presenter = new TodoPresenter(mockTodos);
      update = jest.fn();
      update2 = jest.fn();
    });
    it("should update todo list", () => {
      const newMessage = "new Todo Message";
      presenter.updateTodo(update, mockTodos[0].id, newMessage);
      expect(mockTodos[0].todoMessage).toBe(newMessage);
    });
    it("should call update fn", () => {
      const newMessage = "new Todo Message";
      presenter.updateTodo(update, mockTodos[0].id, newMessage);
      expect(update).toHaveBeenCalledTimes(1);
      expect(update).toHaveBeenCalledWith(mockTodos);
    });
    it("should have done updated when done exist", () => {
      const newMessage = "new Todo Message";
      const done = true;
      presenter.updateTodo(update, mockTodos[0].id, newMessage, done);
      expect(mockTodos[0].done).toBe(done);
      expect(mockTodos[0].updated).not.toBeNull();
    });
    it("should not update if not found", () => {
      const newMessage = "";
      presenter.updateTodo(update, "123", newMessage, true);
      presenter.updateTodo(update, mockTodos[0].id, newMessage);
      expect(mockTodos).toEqual(presenter.todos);
      expect(mockTodos[0].updated).not.toBeNull();
      expect(mockTodos[0]).toEqual(presenter.todos[0]);
    });

    it("should not create a new object when updating", () => {
      const newMessage = "new todo";
      presenter.updateTodo(update, mockTodos[0].id, newMessage, true);
      expect(presenter.todos[0]).toBe(mockTodos[0]);
    });
  });

  describe("addHandler", () => {
    it("should add one more Todo", () => {
      const newMessage = "new";
      presenter.addHandler(update, newMessage);
      expect(update).toHaveBeenCalledWith(presenter.todos);
      expect(update).toHaveBeenCalledTimes(1);
      expect(presenter.todos.length).toBe(3);
      expect(presenter.todos[2].todoMessage).toBe(newMessage);
    });

    it("should not add empty Todo", () => {
      const newMessage = "";
      presenter.addHandler(update, newMessage);
      expect(update).toHaveBeenCalledTimes(0);
      expect(presenter.todos).toEqual(mockTodos);
    });
  });

  describe("deleteHandler", () => {
    it("should delete Todo", () => {
      presenter.deleteHandler(update, presenter.todos[0].id);
      expect(presenter.todos.length).toBe(1);
    });
  });
});
