import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IListType } from './types';

// Define the initial state using that type
const initialState: IListType[] = [];

const addItemToArray = (state, action: PayloadAction<object>) => {
  state.push(action.payload);
};

export const listSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    add: addItemToArray,
    check: (state, action: PayloadAction<number>) =>
      state.filter((state) => state.id !== action.payload),
  },
});

export const { add, check } = listSlice.actions;

export default listSlice.reducer;
