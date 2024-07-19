import { combineReducers, configureStore } from '@reduxjs/toolkit'
import sessionReducer from './features/login/isLoggedIn/sessionSlice';

// imported for redux-persist
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';


const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({ 
  session: sessionReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['persist/PERSIST'],
      },
    }),
  
})

export const persistor = persistStore(store)