import React, { useEffect } from "react";
import styles from "./TodoApp.module.scss";
import { useSelector } from "react-redux";
import {
  fetchTodos,
  addTodo,
  editTodo,
  deleteTodo,
  toggleTodo,
} from "../redux/todoSlice";
import { useAppDispatch } from "../hook";
import TodoInput from "../components/input/TodoInput";
import TodoItem from "../components/item/TodoItem";

const TodoApp: React.FC = () => {
  const dispatch = useAppDispatch();
  //@ts-ignore
  const todos = useSelector((state) => state.todos);
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    dispatch(fetchTodos());
    setIsLoading(false);
  }, [dispatch]);

  return (
    <div className={styles["todo-app"]}>
      <h1 className={styles["app-title"]}>Todo App</h1>
      <TodoInput onAddTodo={(text) => dispatch(addTodo(text))} />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {todos.map((todo: any) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggleTodo={(id) => dispatch(toggleTodo(id))}
              onEditTodo={(editedTodo) => dispatch(editTodo(editedTodo))}
              onDeleteTodo={(id) => dispatch(deleteTodo(id))}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoApp;
