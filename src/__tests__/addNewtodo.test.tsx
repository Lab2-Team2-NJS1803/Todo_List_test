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

describe("Adding new todos", () => {
    it("should allow users to add a new todo", () => {
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

        const inputElement = screen.getByPlaceholderText('Add Todo');
        const addButton = screen.getByText('Add');

        // Type a new todo into the input
        fireEvent.change(inputElement, { target: { value: 'New Task' } });

        // Click the Add button
        fireEvent.click(addButton);

        // Expect addTodo function to be called with the new todo title
        expect(mockAddTodo).toHaveBeenCalledWith('New Task');
    });

    it("should not add a todo if input is empty", () => {
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

        const addButton = screen.getByText('Add');

        // Click the Add button without entering a value
        fireEvent.click(addButton);

        // Expect addTodo function NOT to be called
        expect(mockAddTodo).not.toHaveBeenCalled();
    });
});
