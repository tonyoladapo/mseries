import AsyncStorage from '@react-native-async-storage/async-storage';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

import prefReducer from './reducers/pref';
import authReducer from './reducers/auth';
import showReducer from './reducers/show';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['pref', 'auth', 'show'],
};

const reducers = combineReducers({
  pref: prefReducer,
  auth: authReducer,
  show: showReducer,
});

const persisted_reducers = persistReducer(persistConfig, reducers);

export const store = createStore(persisted_reducers, applyMiddleware(thunk));
export const persistor = persistStore(store);
