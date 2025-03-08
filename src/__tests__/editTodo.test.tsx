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

describe("Editing todos", () => {
    it("should allow users to edit a todo title", () => {
        const mockEditTodo = jest.fn();

        useTodosSpy.mockReturnValue({
            Todos: [
                { id: 1, title: 'Buy groceries', completed: false },
            ],
            setTodoCompleted: jest.fn(),
            addTodo: jest.fn(),
            deleteAllCompleted: jest.fn(),
            deleteTodo: jest.fn(),
            editTodo: mockEditTodo,
        });

        renderApp();

        // Get the edit button and click it
        const editButton = screen.getByRole('button', { name: /edit/i });
        fireEvent.click(editButton);

        // Get the input field and update its value
        const inputField = screen.getByDisplayValue('Buy groceries');
        fireEvent.change(inputField, { target: { value: 'Buy milk' } });

        // Click the save button
        const saveButton = screen.getByRole('button', { name: /save/i });
        fireEvent.click(saveButton);

        // Ensure editTodo is called with correct arguments
        expect(mockEditTodo).toHaveBeenCalledWith(1, 'Buy milk');
    });

    it("should not save an empty title", () => {
        const mockEditTodo = jest.fn();

        useTodosSpy.mockReturnValue({
            Todos: [
                { id: 1, title: 'Buy groceries', completed: false },
            ],
            setTodoCompleted: jest.fn(),
            addTodo: jest.fn(),
            deleteAllCompleted: jest.fn(),
            deleteTodo: jest.fn(),
            editTodo: mockEditTodo,
        });

        renderApp();

        // Get the edit button and click it
        const editButton = screen.getByRole('button', { name: /edit/i });
        fireEvent.click(editButton);

        // Get the input field and clear its value
        const inputField = screen.getByDisplayValue('Buy groceries');
        fireEvent.change(inputField, { target: { value: '' } });

        // Click the save button
        const saveButton = screen.getByRole('button', { name: /save/i });
        fireEvent.click(saveButton);

        // Ensure editTodo was NOT called (empty title should not be saved)
        expect(mockEditTodo).not.toHaveBeenCalled();
    });

    it("should cancel editing when cancel button is clicked", () => {
        useTodosSpy.mockReturnValue({
            Todos: [
                { id: 1, title: 'Buy groceries', completed: false },
            ],
            setTodoCompleted: jest.fn(),
            addTodo: jest.fn(),
            deleteAllCompleted: jest.fn(),
            deleteTodo: jest.fn(),
            editTodo: jest.fn(),
        });

        renderApp();

        // Click the edit button
        const editButton = screen.getByRole('button', { name: /edit/i });
        fireEvent.click(editButton);

        // Click the cancel button
        const cancelButton = screen.getByRole('button', { name: /cancel/i });
        fireEvent.click(cancelButton);

        // Ensure the original title is still displayed
        expect(screen.getByText('Buy groceries')).toBeInTheDocument();
    });
});
