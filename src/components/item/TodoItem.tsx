import React from "react";
import styles from "./TodoItem.module.scss";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

const TodoItem: React.FC<{
  todo: Todo;
  onToggleTodo: (id: string) => void;
  onEditTodo: (editedTodo: { id: string; newText: string }) => void;
  onDeleteTodo: (id: string) => void;
}> = ({ todo, onToggleTodo, onEditTodo, onDeleteTodo }) => {
  const handleEditTodo = () => {
    const newText = prompt("Edit Todo", todo.text);
    if (newText !== null && newText.trim() !== "") {
      onEditTodo({ id: todo.id, newText });
    } else {
      alert("Todo text cannot be empty");
    }
  };

  return (
    <li className={styles["todo-item"]}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggleTodo(todo.id)}
        className={styles.checkbox}
      />
      <span
        className={styles["todo-text"]}
        style={{
          textDecoration: todo.completed ? "line-through" : "none",
        }}
      >
        {todo.text}
      </span>
      <button className={styles["edit-button"]} onClick={handleEditTodo}>
        Edit
      </button>
      <button
        className={styles["delete-button"]}
        onClick={() => onDeleteTodo(todo.id)}
      >
        Delete
      </button>
    </li>
  );
};

export default TodoItem;
