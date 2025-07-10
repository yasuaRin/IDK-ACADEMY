import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api';

export const fetchScores = createAsyncThunk('scores/fetch', async (page) => {
  const res = await api.get(`/scores?page=${page}`);
  return res.data;
});

export const addScore = createAsyncThunk('scores/add', async (data) => {
  const res = await api.post('/scores', data);
  return res.data;
});

export const deleteScore = createAsyncThunk('scores/delete', async (id) => {
  await api.delete(`/scores/${id}`);
  return id;
});

export const updateScore = createAsyncThunk('scores/update', async ({ id, data }) => {
  const res = await api.put(`/scores/${id}`, data);
  return res.data;
});

// update and delete omitted for brevity

const slice = createSlice({
  name: 'scores',
  initialState: { list: [], totalPages: 1, currentPage: 1 },
  extraReducers: builder => {
    builder.addCase(fetchScores.fulfilled, (state, action) => {
      state.list = action.payload.scores;
      state.totalPages = action.payload.totalPages;
      state.currentPage = action.payload.currentPage;
    });
    builder.addCase(addScore.fulfilled, state => {});
  },
});
export default slice.reducer;
