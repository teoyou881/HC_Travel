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
    // getDefaultMdddleware -> this is the basic middleware redux-toolkit has
    // when using persist, in action, some non-serializable value are passed
    // and it may raise an error.
    // Redux can't pass non-serializable value.
    // so, let middleware not to check serializableCheck when persist is only used
    // persist types should be listed in ignoredActions array in serializableCheck.
    /* Why only accept serializable values?
    Redux recommends that you only store serializable values 
    to ensure that the UI reflects what you expect, 
    or for time travel functionality and proper debugging. */
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
