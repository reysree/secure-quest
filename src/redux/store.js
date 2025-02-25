import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import securityPuzzleReducer from "./securityPuzzleSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    securityPuzzle: securityPuzzleReducer,
  },
});
