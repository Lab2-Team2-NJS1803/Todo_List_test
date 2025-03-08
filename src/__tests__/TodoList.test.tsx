import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import TodoList from "../components/TodoList";
import { Todo } from "../types/todo";

describe("TodoList Component", () => {
  const mockTodos: Todo[] = [
    { id: 1, title: "Buy groceries", completed: false },
    { id: 2, title: "Wash car", completed: true },
  ];

  // const mockOnCompletedChange = jest.fn();
  // const mockOnDelete = jest.fn();
  // const mockOnEdit = jest.fn();

  test("should show a message if there are no todos", () => {
    render(
        <TodoList
            todos={[]}
            onCompletedChange={() => {}}
            onDelete={() => {}}
            onEdit={() => {}}
        />
    );
    expect(screen.getByText("No more todos! Congrats!")).toBeInTheDocument();
    const todoItems = screen.getAllByRole("checkbox"); // All checkboxes represent todos
    expect(todoItems).toHaveLength(mockTodos.length);
  });

  test("should not show the empty state message if there are todos", () => {
    const todos = [
        { id: 1, title: "Buy groceries", completed: false },
    ];

    render(
        <TodoList
            todos={todos}
            onCompletedChange={() => {}}
            onDelete={() => {}}
            onEdit={() => {}}
        />
    );

    // Ensure the empty state message is not present
    expect(screen.queryByText("No more todos! Congrats!")).not.toBeInTheDocument();
});

  // it("applies strikethrough style to completed todos", () => {
  //   render(
  //     <TodoList 
  //       Todos={mockTodos} 
  //       onCompletedChange={mockOnCompletedChange} 
  //       onDelete={mockOnDelete} 
  //       onEdit={mockOnEdit} 
  //     />
  //   );

  //   const completedTodo = screen.getByText("Wash car");
  //   expect(completedTodo).toHaveClass("line-through");
  // });
});
