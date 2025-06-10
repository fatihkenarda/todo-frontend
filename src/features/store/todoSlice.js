import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getTodos, createTodo, deleteTodo } from '../../api/todoService';

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await getTodos();
  return response.data.data;
});

export const addTodo = createAsyncThunk('todos/addTodo', async (data) => {
  const response = await createTodo(data);
  return response.data.data;
});

export const removeTodo = createAsyncThunk('todos/removeTodo', async (id) => {
  await deleteTodo(id);
  return id;
});

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(addTodo.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })

      .addCase(removeTodo.fulfilled, (state, action) => {
        state.items = state.items.filter((todo) => todo.id !== action.payload);
      });
  },
});

export default todoSlice.reducer;