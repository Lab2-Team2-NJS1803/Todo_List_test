import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import * as useTodos from '../hooks/useTodos';
import App from '../App';

const useTodosSpy = jest.spyOn(useTodos, "useTodos");

function renderApp() {
    return render(<App />);
}

beforeEach(() => {
    jest.clearAllMocks(); // Reset mocks before each test
});

describe("Todo List Initial Render", () => {
    it("should render all todos on initial load", () => {
        // Mock the `useTodos` hook to return predefined todos
        useTodosSpy.mockReturnValue({
            Todos: [
                { id: 1, title: 'Buy groceries', completed: false },
                { id: 2, title: 'Walk the dog', completed: true },
                { id: 3, title: 'Read a book', completed: false },
            ],
            setTodoCompleted: jest.fn(),
            addTodo: jest.fn(),
            deleteAllCompleted: jest.fn(),
            deleteTodo: jest.fn(),
            editTodo: jest.fn(),
        });

        renderApp();

        // Check that all todos appear in the document
        expect(screen.getByText('Buy groceries')).toBeInTheDocument();
        expect(screen.getByText('Walk the dog')).toBeInTheDocument();
        expect(screen.getByText('Read a book')).toBeInTheDocument();

        // Ensure the completed task is displayed with a line-through class
        const completedTodo = screen.getByText('Walk the dog');
        expect(completedTodo).toHaveClass('line-through');
    });

    it("should show a message if there are no todos", () => {
        // Mock `useTodos` to return an empty list
        useTodosSpy.mockReturnValue({
            Todos: [],
            setTodoCompleted: jest.fn(),
            addTodo: jest.fn(),
            deleteAllCompleted: jest.fn(),
            deleteTodo: jest.fn(),
            editTodo: jest.fn(),
        });

        renderApp();

        // Check for the empty state message
        expect(screen.getByText("No more todos! Congrats!")).toBeInTheDocument();
    });
});
