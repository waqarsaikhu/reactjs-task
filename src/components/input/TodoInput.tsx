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
      <div>
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
      </div>
      {error && <span className={styles["error-message"]}>{error}</span>}
    </div>
  );
};

export default TodoInput;
