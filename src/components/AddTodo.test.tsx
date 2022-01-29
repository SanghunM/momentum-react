import React from "react";
import renderer from "react-test-renderer";
import AddTodoComponent from "./AddTodo";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("AddTodo Component", () => {
  let setAddingMode: jest.Mock<any, any>;
  let addHandler: jest.Mock<any, any>;

  beforeEach(() => {
    setAddingMode = jest.fn();
    addHandler = jest.fn();
  });
  it("should render", () => {
    const component = renderer.create(
      <AddTodoComponent setAddingMode={setAddingMode} addHandler={addHandler} />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  describe("add form", () => {
    let input: HTMLInputElement;
    let submitButton: HTMLButtonElement;
    beforeEach(() => {
      render(
        <AddTodoComponent
          setAddingMode={setAddingMode}
          addHandler={addHandler}
        />
      );
      input = screen.getByPlaceholderText("Input new list...");
      submitButton = screen.getByText("add");
    });

    it("calls submitHandler when input is submitted", () => {
      userEvent.type(input, "study react");
      //userEvent.type(input, "{backspace}n");
      userEvent.click(submitButton);
      expect(addHandler).toHaveBeenCalledWith("study react");
      expect(setAddingMode).toHaveBeenCalledWith(false);
    });
  });
});
