import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import authSlice from "./authSlice";
import jobSlice from "./jobSlice";
import companySlice from "./companySlice";
import applcationSlice from "./applcationSlice";

// Combine all your slices into one root reducer
const rootReducer = combineReducers({
  auth: authSlice,
  job: jobSlice,
  company: companySlice,
  application:applcationSlice
});

// Configuration for redux-persist
const persistConfig = {
  key: 'root',
  storage, // This will use localStorage for persisting the state
  whitelist: ['auth', 'job','company','application'], // Specify which slices of state you want to persist
};

// Persist the combined reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer, // Use persisted reducer here
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: {
        warnAfter: 64, // Increase the warning threshold for immutable state checks
      },
      serializableCheck: {
        warnAfter: 64, // Increase the warning threshold for serializable state checks
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/PAUSE',
          'persist/PURGE',
          'persist/REGISTER',
        ],
      },
    }),
});

// Persist the store
const persistor = persistStore(store);

export { store, persistor };
