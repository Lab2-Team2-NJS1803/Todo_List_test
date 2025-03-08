import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';
import * as useTodos from '../hooks/useTodos';

const useTodosSpy = jest.spyOn(useTodos, "useTodos");

function renderApp() {
    return render(<App />);
}

beforeEach(() => {
    jest.clearAllMocks(); // Reset mocks before each test
});

describe("Marking todos as complete", () => {
    it("should call setTodoCompleted when a todo is checked", () => {
        const mockSetTodoCompleted = jest.fn();

        useTodosSpy.mockReturnValue({
            Todos: [
                { id: 1, title: 'Buy groceries', completed: false },
            ],
            setTodoCompleted: mockSetTodoCompleted,
            addTodo: jest.fn(),
            deleteAllCompleted: jest.fn(),
            deleteTodo: jest.fn(),
            editTodo: jest.fn(),
        });

        renderApp();

        // Get the checkbox associated with the todo item
        const checkbox = screen.getByRole('checkbox');

        // Click the checkbox to mark it as completed
        fireEvent.click(checkbox);

        // Ensure setTodoCompleted is called with the correct arguments
        expect(mockSetTodoCompleted).toHaveBeenCalledWith(1, true);
    });

    it("should call setTodoCompleted when a completed todo is unchecked", () => {
        const mockSetTodoCompleted = jest.fn();

        useTodosSpy.mockReturnValue({
            Todos: [
                { id: 1, title: 'Buy groceries', completed: true },
            ],
            setTodoCompleted: mockSetTodoCompleted,
            addTodo: jest.fn(),
            deleteAllCompleted: jest.fn(),
            deleteTodo: jest.fn(),
            editTodo: jest.fn(),
        });

        renderApp();

        // Get the checkbox (should be initially checked)
        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).toBeChecked();

        // Click the checkbox to uncheck it
        fireEvent.click(checkbox);

        // Ensure setTodoCompleted is called with the correct arguments
        expect(mockSetTodoCompleted).toHaveBeenCalledWith(1, false);
    });
});
