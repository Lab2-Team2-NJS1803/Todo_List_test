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

describe("Input validation", () => {
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

        // Get input and add button
        const input = screen.getByPlaceholderText('Add Todo');
        const addButton = screen.getByText('Add');

        // Ensure input is empty
        fireEvent.change(input, { target: { value: '' } });
        fireEvent.click(addButton);

        // Ensure addTodo is NOT called
        expect(mockAddTodo).not.toHaveBeenCalled();
    });

    it("should not add a todo if input only contains spaces", () => {
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

        // Get input and add button
        const input = screen.getByPlaceholderText('Add Todo');
        const addButton = screen.getByText('Add');

        // Input only spaces
        fireEvent.change(input, { target: { value: '   ' } });
        fireEvent.click(addButton);

        // Ensure addTodo is NOT called
        expect(mockAddTodo).not.toHaveBeenCalled();
    });

    it("should allow adding a valid todo", () => {
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

        // Get input and add button
        const input = screen.getByPlaceholderText('Add Todo');
        const addButton = screen.getByText('Add');

        // Input a valid todo
        fireEvent.change(input, { target: { value: 'Buy groceries' } });
        fireEvent.click(addButton);

        // Ensure addTodo is called with correct value
        expect(mockAddTodo).toHaveBeenCalledWith('Buy groceries');
    });
});
