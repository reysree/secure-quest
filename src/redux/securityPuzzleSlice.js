import { createSlice } from "@reduxjs/toolkit";

const securityPuzzleSlice = createSlice({
  name: "securityPuzzle",
  initialState: {
    loading: false,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setLoading } = securityPuzzleSlice.actions;
export default securityPuzzleSlice.reducer;
