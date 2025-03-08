import { useState } from "react";

interface TodoFormProps {
    onSubmit: (title: string) => void;
}

const TodoForm = ({ onSubmit }: TodoFormProps) => {
    const [input, setInput] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        const trimmedInput = input.trim();
        if (!trimmedInput) return;

        onSubmit(trimmedInput);
        setInput("");
    };

    return (
        <form className="flex" onSubmit={handleSubmit}>
            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                type="text"
                placeholder="Add Todo"
                className="rounded-s-md grow border-2 border-gray-400 p-1"
                aria-label="Add a new todo"
            />
            <button
                type="submit"
                className="w-16 rounded-e-md bg-slate-900 text-white hover:bg-slate-800"
                aria-label="Submit todo"
            >
                Add
            </button>
        </form>
    );
};

export default TodoForm;