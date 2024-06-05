import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

import userSlice from "./userSlice";
import boardTypeList from './boardTypeList';
import myBoardList from './myBoardList';

const reducers = combineReducers({
    user: userSlice.reducer,
    boardTypeList: boardTypeList.reducer,
    myBoardList: myBoardList.reducer,
});
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user', 'boardTypeList', 'myBoardList']
};
const persistedReducer = persistReducer(persistConfig, reducers);
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore these action types
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
                // Ignore these field paths in all actions
                ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
                // Ignore these paths in the state
                ignoredPaths: ['register'],
            },
        }),
});
export default store;