import { configureStore } from '@reduxjs/toolkit';
import rolSlice from './rol/rol.slice';
import userSlice from './user/user.slice';

const store = configureStore({
  reducer: {
    rol: rolSlice,
    user: userSlice,
  },
});

export default store;
