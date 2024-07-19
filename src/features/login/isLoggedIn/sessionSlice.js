import { createSlice } from '@reduxjs/toolkit';

export const sessionSlice = createSlice({
  name: 'session',
  initialState: {
      isLoggedIn: false,
      userType: null, // Assuming 'admin' or 'teacher', null when not logged in
      email: null
  },
  reducers: { 
    setSession: (state, action) => {
      const { isLoggedIn, userType, email } = action.payload;
      state.isLoggedIn = isLoggedIn;
      state.userType = userType;
      state.email = email;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userType = null;
      state.email = null;
    }
  },
});

export const { setSession, logout } = sessionSlice.actions;

export default sessionSlice.reducer;