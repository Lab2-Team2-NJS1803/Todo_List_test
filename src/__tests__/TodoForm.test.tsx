import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TodoForm from "../components/TodoForm";

describe("TodoForm", () => {
  const mockOnSubmit = jest.fn();

  it("renders the input field and submit button", () => {
    render(<TodoForm onSubmit={mockOnSubmit} />);

    // Check if the input field is rendered
    const inputField = screen.getByPlaceholderText("Add Todo");
    expect(inputField).toBeInTheDocument();

    // Check if the submit button is rendered
    const submitButton = screen.getByRole("button", { name: "Add" });
    expect(submitButton).toBeInTheDocument();
  });

  it("allows typing in the input field", async () => {
    render(<TodoForm onSubmit={mockOnSubmit} />);

    const inputField = screen.getByPlaceholderText("Add Todo");

    // Simulate typing in the input field
    await userEvent.type(inputField, "Study React");

    // Verify that the input field value is updated
    expect(inputField).toHaveValue("Study React");
  });

  it("calls onSubmit when the form is submitted with a non-empty input", async () => {
    render(<TodoForm onSubmit={mockOnSubmit} />);

    const inputField = screen.getByPlaceholderText("Add Todo");
    const submitButton = screen.getByRole("button", { name: "Add" });

    // Simulate typing in the input field
    await userEvent.type(inputField, "Study React");

    // Simulate form submission
    await userEvent.click(submitButton);

    // Verify that onSubmit is called with the correct value
    expect(mockOnSubmit).toHaveBeenCalledWith("Study React");

    // Verify that the input field is cleared after submission
    expect(inputField).toHaveValue("");
  });

  it("does not call onSubmit when the form is submitted with an empty input", async () => {
    render(<TodoForm onSubmit={mockOnSubmit} />);

    const submitButton = screen.getByRole("button", { name: "Add" });

    // Simulate form submission without typing in the input field
    await userEvent.click(submitButton);

    // Verify that onSubmit is not called
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it("does not call onSubmit when the form is submitted with an empty input", async () => {
    // Arrange
    render(<TodoForm onSubmit={mockOnSubmit} />);
    const submitButton = screen.getByRole("button", { name: "Add" });
  
    // Act
    await userEvent.click(submitButton);
  
    // Assert
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });
});