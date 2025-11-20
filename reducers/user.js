
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 value: [],
};

export const userSlice = createSlice({
 name: 'user',
 initialState,
 reducers: {
   addUserToken: (state, action) => {
     state.value.push(action.payload);
   },
 },
});

export const { addUserToken } = userSlice.actions;
export default userSlice.reducer;