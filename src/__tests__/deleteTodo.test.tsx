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

describe("Deleting todos", () => {
    it("should allow users to delete a todo", () => {
        const mockDeleteTodo = jest.fn();

        useTodosSpy.mockReturnValue({
            Todos: [
                { id: 1, title: 'Buy groceries', completed: false },
            ],
            setTodoCompleted: jest.fn(),
            addTodo: jest.fn(),
            deleteAllCompleted: jest.fn(),
            deleteTodo: mockDeleteTodo,
            editTodo: jest.fn(),
        });

        renderApp();

        // Get the delete button and click it
        const deleteButton = screen.getByRole('button', { name: /delete/i });
        fireEvent.click(deleteButton);

        // Ensure deleteTodo is called with correct id
        expect(mockDeleteTodo).toHaveBeenCalledWith(1);
    });

    it("should remove the todo from the list after deletion", () => {
        let todos = [{ id: 1, title: 'Buy groceries', completed: false }];
        const mockDeleteTodo = jest.fn((id) => {
            todos = todos.filter(todo => todo.id !== id);
        });

        useTodosSpy.mockReturnValue({
            Todos: todos,
            setTodoCompleted: jest.fn(),
            addTodo: jest.fn(),
            deleteAllCompleted: jest.fn(),
            deleteTodo: mockDeleteTodo,
            editTodo: jest.fn(),
        });

        renderApp();

        // Ensure the todo is initially present
        expect(screen.getByText('Buy groceries')).toBeInTheDocument();

        // Get the delete button and click it
        const deleteButton = screen.getByRole('button', { name: /delete/i });
        fireEvent.click(deleteButton);

        // Simulate re-render with updated todos
        useTodosSpy.mockReturnValue({
            Todos: [],
            setTodoCompleted: jest.fn(),
            addTodo: jest.fn(),
            deleteAllCompleted: jest.fn(),
            deleteTodo: mockDeleteTodo,
            editTodo: jest.fn(),
        });

        renderApp();

        // Ensure the todo is removed from the document
        expect(screen.queryByText('Buy groceries')).not.toBeInTheDocument();
    });
});
