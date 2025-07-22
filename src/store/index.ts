import { configureStore } from "@reduxjs/toolkit";
import workspaceReducer from "./slices/workspaceSlice";
import userReducer from "./slices/userSlice";

export const store = configureStore({
  reducer: {
     user: userReducer,
    workspace: workspaceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
