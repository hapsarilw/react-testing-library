import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Todo from "../Todo";

const MockTodo = () => {
  return (
    <BrowserRouter>
      <Todo />
    </BrowserRouter>
  );
};

const addTask = (tasks) => {
  const inputElement = screen.getByPlaceholderText(/Add a new task here.../i);
  const buttonElement = screen.getByRole("button", { name: /Add/i });
  tasks.forEach((task) => {
    fireEvent.change(inputElement, {
      target: { value: task },
    });
    fireEvent.click(buttonElement);
  });
};

describe("Todo", () => {
  it("should render same text passed into title prop", async () => {
    render(<MockTodo />);
    addTask(["Go Grocery Shopping"]);
    const divElements = screen.getByText(/Go Grocery Shopping/i);
    expect(divElements).toBeInTheDocument(3);
  });
  it("should render multiple items", async () => {
    render(<MockTodo />);
    addTask(["Go Grocery Shopping", "Pet My Cat", "Clean My Hands"]);
    const divElements = screen.getAllByTestId("task-container");
    expect(divElements.length).toBe(3);
  });
  it("task should not have completed class when initially rendered", async () => {
    render(<MockTodo />);
    addTask(["Go Grocery Shopping"]);
    const divElements = screen.getByText(/Go Grocery Shopping/i);
    expect(divElements).not.toHaveClass("todo-item-active");
  });
  it("task should have completed class when clicked", async () => {
    render(<MockTodo />);
    addTask(["Go Grocery Shopping"]);
    const divElements = screen.getByText(/Go Grocery Shopping/i);
    fireEvent.click(divElements);
    expect(divElements).toHaveClass('todo-item-active');
  });
});
