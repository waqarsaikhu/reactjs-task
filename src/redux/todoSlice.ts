import { createSlice, createAsyncThunk, PayloadAction, createAction } from '@reduxjs/toolkit';
import { db } from "../firebase.config";
import {
  collection,
  doc,
  getDocs,
  updateDoc,
  deleteDoc,
  addDoc,
} from "firebase/firestore";
import { RootState } from '../store';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
   newText?: string;
}

// Async action to fetch todos from Firestore
export const fetchTodos = createAsyncThunk<Todo[]>('todos/fetchTodos', async () => {
  const snapshot = await getDocs(collection(db, 'todos'));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Todo));
});

// Async action to add a todo
export const addTodo = createAsyncThunk<string, string, { state: RootState }>(
  'todos/addTodo',
  async (text, { dispatch }) => {
    if (text.trim() !== "") {
      // Add todo to Firestore and await the DocumentReference
      const docRef = await addDoc(collection(db, 'todos'), {
        text: text,
        completed: false,
      });
      // Dispatch an action to add the todo to state
      dispatch(todoAdded({ id: docRef.id, text: text, completed: false }));
      return text;
    }
    return "";
  }
);

// Action to add a todo to state
const todoAdded = createAction<Todo>('todos/todoAdded');

const todosSlice = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {
    editTodo: (state, action: PayloadAction<{id: string, newText: string}>) => {
      // Update todo in Firestore
      const docRef = doc(db, 'todos', action.payload.id);
      updateDoc(docRef, { text: action.payload.newText });
      // Update todo in state
      const todo = state.find(todo => todo.id === action.payload.id);
      if (todo) {
        todo.text = action.payload.newText;
      }
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      // Delete todo from Firestore
      const docRef = doc(db, 'todos', action.payload);
      deleteDoc(docRef);
      // Delete todo from state
      return state.filter(todo => todo.id !== action.payload);
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      // Toggle todo in state
      const todo = state.find(todo => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      // Replace state with fetched todos
      return action.payload;
    }).addCase(todoAdded, (state, action) => {
      // Add the new todo to state
      state.push(action.payload);
    });
  },
});

export const { editTodo, deleteTodo, toggleTodo } = todosSlice.actions;

export default todosSlice.reducer;
