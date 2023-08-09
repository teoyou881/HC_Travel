import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import storage from "redux-persist/lib/storage";
import {
    DEFAULT_VERSION,
    FLUSH,
    KEY_PREFIX,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    REHYDRATE,
    persistReducer,
    persistStore,
} from "redux-persist";

// Takes an object with values from different reducing functions and
// converts them into a single reducing function that can be passed to the createstore.
export const rootReducer = combineReducers({
    user: userReducer,
});

// Decide where to store the state in your redux store.
const persistConfig = {
    key: "root", // key 이름
    storage, // save to localStorage
    //whiteList: [userReducer], // Among multiple reducers, only the corresponding reducer is stored in localstorage.
    // blackList: [] // blacklist -> Except for this.
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    KEY_PREFIX,
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                    DEFAULT_VERSION,
                ],
            },
        }),
});

export const persistor = persistStore(store);
