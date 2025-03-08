import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import * as useTodos from './hooks/useTodos';

const useTodosSpy = jest.spyOn(useTodos, "useTodos");

function renderApp() {
    return render(<App />);
}

beforeEach(() => {
    jest.clearAllMocks(); // Ensure no test pollutes another
});

describe('App Component', () => {
    it('renders Todo App title', () => {
        renderApp();
        expect(screen.getByText('Todo App')).toBeInTheDocument();
    });
});

describe("useTodos Hook", () => {
    it("should render all todos", () => {
        useTodosSpy.mockReturnValue({
            Todos: [{ id: 10, title: 'New Todo', completed: false }],
            setTodoCompleted: jest.fn(),
            addTodo: jest.fn(),
            deleteAllCompleted: jest.fn(),
            deleteTodo: jest.fn(),
            editTodo: jest.fn(),
        });

        renderApp();

        expect(screen.getByText('New Todo')).toBeInTheDocument();
    });

    it('should call setTodoCompleted when a todo is marked as completed', () => {
        const mockSetTodoCompleted = jest.fn();

        useTodosSpy.mockReturnValue({
            Todos: [{ id: 10, title: 'New Todo', completed: false }],
            setTodoCompleted: mockSetTodoCompleted,
            addTodo: jest.fn(),
            deleteAllCompleted: jest.fn(),
            deleteTodo: jest.fn(),
            editTodo: jest.fn(),
        });

        renderApp();

        const checkbox = screen.getByRole("checkbox", { name: /new todo/i });

        fireEvent.click(checkbox);

        expect(mockSetTodoCompleted).toHaveBeenCalledWith(10, true);
    });

    it('should call addTodo when a new todo is added', () => {
        const mockAddTodo = jest.fn();

        useTodosSpy.mockReturnValue({
            Todos: [{ id: 10, title: 'New Todo', completed: false }],
            setTodoCompleted: jest.fn(),
            addTodo: mockAddTodo,
            deleteAllCompleted: jest.fn(),
            deleteTodo: jest.fn(),
            editTodo: jest.fn(),
        });

        renderApp();

        const input = screen.getByPlaceholderText('Add Todo');
        const button = screen.getByText('Add');

        fireEvent.change(input, { target: { value: 'New Task' } });
        fireEvent.click(button);

        expect(mockAddTodo).toHaveBeenCalledWith('New Task');
    });

    it('should call deleteTodo when a todo is deleted', () => {
        const mockDeleteTodo = jest.fn();

        useTodosSpy.mockReturnValue({
            Todos: [{ id: 10, title: 'New Todo', completed: false }],
            setTodoCompleted: jest.fn(),
            addTodo: jest.fn(),
            deleteAllCompleted: jest.fn(),
            deleteTodo: mockDeleteTodo,
            editTodo: jest.fn(),
        });

        renderApp();

        const deleteButton = screen.getByRole("button", { name: /trash/i });

        fireEvent.click(deleteButton);

        expect(mockDeleteTodo).toHaveBeenCalledWith(10);
    });

    it('should call deleteAllCompleted when clicking "Delete Completed"', () => {
        const mockDeleteAllCompleted = jest.fn();

        useTodosSpy.mockReturnValue({
            Todos: [
                { id: 10, title: 'Task 1', completed: false },
                { id: 11, title: 'Task 2', completed: true }
            ],
            setTodoCompleted: jest.fn(),
            addTodo: jest.fn(),
            deleteAllCompleted: mockDeleteAllCompleted,
            deleteTodo: jest.fn(),
            editTodo: jest.fn(),
        });

        renderApp();

        const deleteCompletedButton = screen.getByText("Delete Completed");
        fireEvent.click(deleteCompletedButton);

        expect(mockDeleteAllCompleted).toHaveBeenCalled();
    });
});
