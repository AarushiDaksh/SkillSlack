// store/slices/workspaceSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WorkspaceState {
  id: any;
  _id: any;
  name: string;
  workspace: {
    id: string;
    name: string;
    userId: string;
  } | null;
}

const initialState: WorkspaceState = {
  workspace: null,
  name: "",
  _id: undefined,
  id: undefined
};

export const workspaceSlice = createSlice({
  name: "workspace",
  initialState,
  reducers: {
    setWorkspace: (state, action: PayloadAction<WorkspaceState["workspace"]>) => {
      state.workspace = action.payload;
    },
    clearWorkspace: (state) => {
      state.workspace = null;
    },
  },
});

export const { setWorkspace, clearWorkspace } = workspaceSlice.actions;
export default workspaceSlice.reducer;