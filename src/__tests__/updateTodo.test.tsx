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
    jest.clearAllMocks(); // Reset mocks before each test
});

describe("Todo List Updates", () => {
    
    it("should update the list when a new todo is added", () => {
        const mockAddTodo = jest.fn();
        const todosMock: Todo[] = []; // ✅ Ensure TypeScript recognizes the empty array as Todo[]

        useTodosSpy.mockReturnValue({
            Todos: todosMock,
            setTodoCompleted: jest.fn(),
            addTodo: mockAddTodo,
            deleteAllCompleted: jest.fn(),
            deleteTodo: jest.fn(),
            editTodo: jest.fn(),
        });

        renderApp();

        const input = screen.getByPlaceholderText('Add Todo');
        const addButton = screen.getByText('Add');

        fireEvent.change(input, { target: { value: 'Walk the dog' } });
        fireEvent.click(addButton);

        expect(mockAddTodo).toHaveBeenCalledWith('Walk the dog');
    });

    it("should update the list when a todo is marked as complete", () => {
        const mockSetTodoCompleted = jest.fn();
        const todosMock = [{ id: 1, title: 'Buy groceries', completed: false }];

        useTodosSpy.mockReturnValue({
            Todos: todosMock,
            setTodoCompleted: mockSetTodoCompleted,
            addTodo: jest.fn(),
            deleteAllCompleted: jest.fn(),
            deleteTodo: jest.fn(),
            editTodo: jest.fn(),
        });

        renderApp();

        const checkbox = screen.getByLabelText('Buy groceries');
        fireEvent.click(checkbox);

        expect(mockSetTodoCompleted).toHaveBeenCalledWith(1, true);
    });

    it("should update the list when a todo is edited", () => {
        const mockEditTodo = jest.fn();
        const todosMock = [{ id: 1, title: 'Buy groceries', completed: false }];

        useTodosSpy.mockReturnValue({
            Todos: todosMock,
            setTodoCompleted: jest.fn(),
            addTodo: jest.fn(),
            deleteAllCompleted: jest.fn(),
            deleteTodo: jest.fn(),
            editTodo: mockEditTodo,
        });

        renderApp();

        const editButton = screen.getByRole('button', { name: /edit/i });
        fireEvent.click(editButton);

        const editInput = screen.getByDisplayValue('Buy groceries');
        fireEvent.change(editInput, { target: { value: 'Buy vegetables' } });

        const saveButton = screen.getByRole('button', { name: /save/i });
        fireEvent.click(saveButton);

        expect(mockEditTodo).toHaveBeenCalledWith(1, 'Buy vegetables');
    });

    it("should update the list when a todo is deleted", () => {
        const mockDeleteTodo = jest.fn();
        const todosMock = [{ id: 1, title: 'Buy groceries', completed: false }];

        useTodosSpy.mockReturnValue({
            Todos: todosMock,
            setTodoCompleted: jest.fn(),
            addTodo: jest.fn(),
            deleteAllCompleted: jest.fn(),
            deleteTodo: mockDeleteTodo,
            editTodo: jest.fn(),
        });

        renderApp();

        const deleteButton = screen.getByRole('button', { name: /delete/i });
        fireEvent.click(deleteButton);

        expect(mockDeleteTodo).toHaveBeenCalledWith(1);
    });

});
