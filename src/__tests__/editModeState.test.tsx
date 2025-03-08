import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';
import * as useTodos from '../hooks/useTodos';
import { Todo } from '../types/todo';

const useTodosSpy = jest.spyOn(useTodos, "useTodos");

function renderApp() {
    return render(<App />);
}

beforeEach(() => {
    jest.clearAllMocks();
});

describe("Editing Todos", () => {
    it("should enter edit mode when the edit button is clicked", () => {
        const mockEditTodo = jest.fn();
        const todosMock: Todo[] = [
            { id: 1, title: "Learn React", completed: false },
        ];

        useTodosSpy.mockReturnValue({
            Todos: todosMock,
            setTodoCompleted: jest.fn(),
            addTodo: jest.fn(),
            deleteAllCompleted: jest.fn(),
            deleteTodo: jest.fn(),
            editTodo: mockEditTodo,
        });

        renderApp();

        // Click edit button
        const editButton = screen.getByRole('button', { name: /edit/i });
        fireEvent.click(editButton);

        // Expect an input field to appear
        expect(screen.getByDisplayValue("Learn React")).toBeInTheDocument();
    });

    it("should save the edited todo and exit edit mode", () => {
        const mockEditTodo = jest.fn();
        const todosMock: Todo[] = [
            { id: 1, title: "Learn React", completed: false },
        ];

        useTodosSpy.mockReturnValue({
            Todos: todosMock,
            setTodoCompleted: jest.fn(),
            addTodo: jest.fn(),
            deleteAllCompleted: jest.fn(),
            deleteTodo: jest.fn(),
            editTodo: mockEditTodo,
        });

        renderApp();

        // Click edit button
        const editButton = screen.getByRole('button', { name: /edit/i });
        fireEvent.click(editButton);

        // Edit the todo title
        const input = screen.getByDisplayValue("Learn React");
        fireEvent.change(input, { target: { value: "Master React" } });

        // Click save button
        const saveButton = screen.getByRole('button', { name: /save/i });
        fireEvent.click(saveButton);

        // Ensure editTodo function was called with correct arguments
        expect(mockEditTodo).toHaveBeenCalledWith(1, "Master React");

        // Ensure edit mode exited (input should not exist)
        expect(screen.queryByDisplayValue("Master React")).not.toBeInTheDocument();
    });

    it("should cancel edit mode without saving when cancel button is clicked", () => {
        const todosMock: Todo[] = [
            { id: 1, title: "Learn React", completed: false },
        ];

        useTodosSpy.mockReturnValue({
            Todos: todosMock,
            setTodoCompleted: jest.fn(),
            addTodo: jest.fn(),
            deleteAllCompleted: jest.fn(),
            deleteTodo: jest.fn(),
            editTodo: jest.fn(), // No need for mock function in cancel test
        });

        renderApp();

        // Click edit button
        const editButton = screen.getByRole('button', { name: /edit/i });
        fireEvent.click(editButton);

        // Change input value
        const input = screen.getByDisplayValue("Learn React");
        fireEvent.change(input, { target: { value: "Master React" } });

        // Click cancel button
        const cancelButton = screen.getByRole('button', { name: /cancel/i });
        fireEvent.click(cancelButton);

        // Ensure edit mode exited without calling editTodo
        expect(screen.queryByDisplayValue("Master React")).not.toBeInTheDocument();
        expect(screen.getByText("Learn React")).toBeInTheDocument();
    });
});
