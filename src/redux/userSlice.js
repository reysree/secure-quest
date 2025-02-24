import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : null, // ✅ Load from localStorage
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload)); // ✅ Save to localStorage
    },
    clearUser: (state) => {
      state.user = null;
      localStorage.removeItem("user"); // ✅ Remove from localStorage
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
