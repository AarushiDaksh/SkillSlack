import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import workspaceReducer from "./slices/workspaceSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    workspace: workspaceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
