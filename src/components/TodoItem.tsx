import { useState } from "react";
import { Trash2Icon, Edit3Icon, SaveIcon, XIcon } from "lucide-react";
import { Todo } from "../types/todo";

interface TodoItemProps {
    todo: Todo;
    onCompletedChange: (id: number, completed: boolean) => void;
    onDelete: (id: number) => void;
    onEdit: (id: number, newTitle: string) => void;
}

const TodoItem = ({ todo, onCompletedChange, onDelete, onEdit }: TodoItemProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(todo.title);

    const handleSave = () => {
        const trimmedTitle = newTitle.trim();
        if (trimmedTitle) {
            onEdit(todo.id, trimmedTitle);
            setIsEditing(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSave();
        } else if (e.key === "Escape") {
            setNewTitle(todo.title); // Reset title if Esc is pressed
            setIsEditing(false);
        }
    };

    return (
        <div className="flex justify-between items-center rounded-md border p-2 border-gray-400 bg-white hover:bg-slate-50">
            <div className="flex gap-2 flex-grow items-center">
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={(e) => onCompletedChange(todo.id, e.target.checked)}
                    className="scale-125"
                    aria-label={todo.completed ? "Mark as incomplete" : "Mark as complete"}
                />
                {isEditing ? (
                    <input
                        type="text"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="border rounded-md p-1 flex-grow"
                        autoFocus
                        aria-label="Edit todo"
                    />
                ) : (
                    <span className={todo.completed ? "line-through text-gray-400" : ""}>
                        {todo.title}
                    </span>
                )}
            </div>

            <div className="flex gap-2">
                {isEditing ? (
                    <>
                        <button
                            className="hover:text-green-500"
                            onClick={handleSave}
                            aria-label="Save changes"
                        >
                            <SaveIcon />
                        </button>
                        <button
                            className="hover:text-red-500"
                            onClick={() => {
                                setNewTitle(todo.title);
                                setIsEditing(false);
                            }}
                            aria-label="Cancel editing"
                        >
                            <XIcon />
                        </button>
                    </>
                ) : (
                    <button
                        className="hover:text-blue-500"
                        onClick={() => setIsEditing(true)}
                        aria-label="Edit todo"
                    >
                        <Edit3Icon />
                    </button>
                )}
                <button
                    className="hover:text-red-500"
                    onClick={() => onDelete(todo.id)}
                    aria-label="Delete todo"
                >
                    <Trash2Icon />
                </button>
            </div>
        </div>
    );
};

export default TodoItem;