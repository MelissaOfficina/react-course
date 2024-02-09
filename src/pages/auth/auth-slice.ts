import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
interface IAuthState {
  login: string;
  logged: boolean;
}

// Define the initial state using that type
const initialState: IAuthState = {
  login: '',
  logged: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.login = action.payload;
      state.auth = true;
    },
    logout: (state) => {
      state.login = '';
      state.auth = false;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
