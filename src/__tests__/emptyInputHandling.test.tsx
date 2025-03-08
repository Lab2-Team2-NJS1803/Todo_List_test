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

describe("Empty Input Handling", () => {
    it("should prevent adding an empty todo", () => {
        const mockAddTodo = jest.fn();

        useTodosSpy.mockReturnValue({
            Todos: [],
            setTodoCompleted: jest.fn(),
            addTodo: mockAddTodo,
            deleteAllCompleted: jest.fn(),
            deleteTodo: jest.fn(),
            editTodo: jest.fn(),
        });

        renderApp();

        const input = screen.getByPlaceholderText("Add Todo");
        const addButton = screen.getByText("Add");

        // Try to add an empty todo
        fireEvent.change(input, { target: { value: "  " } });
        fireEvent.click(addButton);

        // Ensure addTodo was NOT called
        expect(mockAddTodo).not.toHaveBeenCalled();
    });

    it("should prevent saving an empty edited todo", () => {
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

        // Clear input value
        const input = screen.getByDisplayValue("Learn React");
        fireEvent.change(input, { target: { value: " " } });

        // Try to save empty input
        const saveButton = screen.getByRole('button', { name: /save/i });
        fireEvent.click(saveButton);

        // Ensure editTodo was NOT called
        expect(mockEditTodo).not.toHaveBeenCalled();
    });
});
