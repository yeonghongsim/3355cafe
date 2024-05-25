import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    boardTypeList: null
};

export const boardTypeList = createSlice({
    name: "boardTypeList",
    initialState,
    reducers: {
        setBoardTypeList: (state, action) => {
            state.boardTypeList = action.payload
        },
    },
});

export const { setBoardTypeList } = boardTypeList.actions;
export default boardTypeList;