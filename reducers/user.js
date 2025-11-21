
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { username: null, token: null },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userData: (state, action) => {
      state.value = { username: action.payload.username, token: action.payload.token, firstname : action.payload.firstname };
    },
    Logout : (state) => {
      state.value = { username: null, token: null };
    }
  },
});

export const { userData, Logout } = userSlice.actions;
export default userSlice.reducer;