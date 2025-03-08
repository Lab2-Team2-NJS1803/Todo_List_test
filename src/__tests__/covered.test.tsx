import '@testing-library/jest-dom';
import { act, renderHook } from "@testing-library/react";
import { useTodos } from "../hooks/useTodos";
import { Todo } from "../types/todo";

describe("useTodos Hook", () => {
    beforeEach(() => {
        localStorage.clear();
        jest.restoreAllMocks();
    });

    it("should load todos from localStorage or use default data", () => {
        const mockTodos: Todo[] = [{ id: 1, title: "Test Todo", completed: false }];
        localStorage.setItem("todos", JSON.stringify(mockTodos));

        const { result } = renderHook(() => useTodos());

        expect(result.current.Todos).toEqual(mockTodos);
    });

    it("should add a new todo", () => {
        const { result } = renderHook(() => useTodos());

        act(() => {
            result.current.addTodo("New Task");
        });

        expect(result.current.Todos.length).toBe(1);
        expect(result.current.Todos[0].title).toBe("New Task");
    });

    it("should delete a todo by ID", () => {
        const { result } = renderHook(() => useTodos());

        act(() => {
            result.current.addTodo("Task to delete");
        });

        const todoId = result.current.Todos[0].id;

        act(() => {
            result.current.deleteTodo(todoId);
        });

        expect(result.current.Todos.length).toBe(0);
    });

    it("should edit a todo title", () => {
        const { result } = renderHook(() => useTodos());

        act(() => {
            result.current.addTodo("Old Title");
        });

        const todoId = result.current.Todos[0].id;

        act(() => {
            result.current.editTodo(todoId, "New Title");
        });

        expect(result.current.Todos[0].title).toBe("New Title");
    });

    it("should mark a todo as completed", () => {
        const { result } = renderHook(() => useTodos());

        act(() => {
            result.current.addTodo("Mark Complete");
        });

        const todoId = result.current.Todos[0].id;

        act(() => {
            result.current.setTodoCompleted(todoId, true);
        });

        expect(result.current.Todos[0].completed).toBe(true);
    });

    it("should delete all completed todos", () => {
        const { result } = renderHook(() => useTodos());

        act(() => {
            result.current.addTodo("Complete Me");
            result.current.setTodoCompleted(result.current.Todos[0].id, true);
        });

        act(() => {
            result.current.deleteAllCompleted();
        });

        expect(result.current.Todos.length).toBe(0);
    });

    it("should persist todos to localStorage", () => {
        const setItemSpy = jest.spyOn(Storage.prototype, "setItem");

        const { result } = renderHook(() => useTodos());

        act(() => {
            result.current.addTodo("Persistent Todo");
        });

        expect(setItemSpy).toHaveBeenCalledWith(
            "todos",
            JSON.stringify(result.current.Todos)
        );
    });
});
