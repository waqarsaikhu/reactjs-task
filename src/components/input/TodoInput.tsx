// TodoInput.tsx

import React, { useState } from "react";
import styles from "./TodoInput.module.scss";

const TodoInput: React.FC<{ onAddTodo: (text: string) => void }> = ({
  onAddTodo,
}) => {
  const [inputText, setInputText] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleAddTodo = () => {
    if (inputText.trim() !== "") {
      onAddTodo(inputText);
      setInputText("");
      setError("");
    } else {
      setError("Input cannot be empty");
    }
  };

  return (
    <div className={styles["todo-input"]}>
      <input
        type="text"
        placeholder="Enter Todo"
        value={inputText}
        onChange={handleInputChange}
        className={styles["input-field"]}
        required
      />
      <button onClick={handleAddTodo} className={styles["add-button"]}>
        Add Todo
      </button>
      {error && <p className={styles["error-message"]}>{error}</p>}
    </div>
  );
};

export default TodoInput;
