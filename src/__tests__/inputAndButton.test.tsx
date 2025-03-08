import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import App from '../App';
import * as useTodos from '../hooks/useTodos';

const useTodosSpy = jest.spyOn(useTodos, "useTodos");

function renderApp() {
    return render(<App />);
}

beforeEach(() => {
    jest.clearAllMocks(); // Reset mocks before each test
});

describe("Presence of Input Field and Buttons", () => {
    it("should render the input field for adding todos", () => {
        renderApp();
        
        // Ensure the input field is in the document
        const inputElement = screen.getByPlaceholderText('Add Todo');
        expect(inputElement).toBeInTheDocument();
    });

    it("should render the 'Add' button", () => {
        renderApp();
        
        // Ensure the 'Add' button is present
        const addButton = screen.getByText('Add');
        expect(addButton).toBeInTheDocument();
    });

    it("should render Edit and Delete buttons for each todo", () => {
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

        // Ensure Edit and Delete buttons exist
        expect(screen.getByRole('button', { name: /edit/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument();
    });

    it("should show 'Delete Completed' button when there are completed todos", () => {
        useTodosSpy.mockReturnValue({
            Todos: [
                { id: 1, title: 'Walk the dog', completed: true },
            ],
            setTodoCompleted: jest.fn(),
            addTodo: jest.fn(),
            deleteAllCompleted: jest.fn(),
            deleteTodo: jest.fn(),
            editTodo: jest.fn(),
        });

        renderApp();

        expect(screen.getByText('Delete Completed')).toBeInTheDocument();
    });
});
