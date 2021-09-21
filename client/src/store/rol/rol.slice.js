import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  roles: [],
  edit: false,
  rolId: '',
  rolName: '',
  error: '',
};

const rolSlice = createSlice({
  name: 'rol',
  initialState,
  reducers: {
    editRol(state, action) {
      state.edit = action.payload.editRol;
      state.rolId = action.payload.rolId;
      state.error = '';
    },
    getRoles(state, action) {
      state.roles = action.payload.roles;
    },
    setRolName(state, action) {
      state.rolName = action.payload.name;
    },
    setError(state, action) {
      state.error = action.payload.msg;
    },
  },
});

export const rolActions = rolSlice.actions;
export default rolSlice.reducer;
