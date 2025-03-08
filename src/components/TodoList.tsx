import TodoItem from "./TodoItem";
import { Todo } from "../types/todo";

interface TodoListProps {
  Todos: Todo[];
  onCompletedChange: (id: number, completed: boolean) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, newTitle: string) => void;
}

const TodoList = ({ Todos, onCompletedChange, onDelete, onEdit }: TodoListProps) => {
  const todosSorted = Todos.sort((a, b) => (a.completed === b.completed ? b.id - a.id : a.completed ? 1 : -1));

  return (
    <>
      <div className="space-y-2">
        {todosSorted.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onCompletedChange={onCompletedChange}
            onDelete={onDelete}
            onEdit={onEdit} // Pass edit function
          />
        ))}
      </div>
      
    </>
  );
};

export default TodoList;
