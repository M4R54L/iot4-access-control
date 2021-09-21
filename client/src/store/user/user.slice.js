import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  editUser: false,
  user: {},
  userId: '',
  error: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    editUser(state, action) {
      state.editUser = action.payload.editUser;
      state.userId = action.payload.userId;
      state.error = '';
    },
    getAll(state, action) {
      state.users = action.payload.users;
    },
    getOne(state, action) {
      state.user = action.payload.user;
    },
    setError(state, action) {
      state.error = action.payload.error;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
