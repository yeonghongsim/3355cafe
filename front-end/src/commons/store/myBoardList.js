import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    myBoardList: null
};

export const myBoardList = createSlice({
    name: "myBoardList",
    initialState,
    reducers: {
        setMyBoardList: (state, action) => {
            state.myBoardList = action.payload
        },
    },
});

export const { setMyBoardList } = myBoardList.actions;
export default myBoardList;