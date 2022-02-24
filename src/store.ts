import AsyncStorage from '@react-native-async-storage/async-storage';
import thunk from 'redux-thunk';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';

import prefReducer from './reducers/pref';
import authReducer from './reducers/auth';
import showReducer from './reducers/show';
import discoverReducer from './reducers/discover';
import showDetailsReducer from './reducers/showDetails';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['pref', 'auth', 'show', 'discover'],
};

const reducers = combineReducers({
  pref: prefReducer,
  auth: authReducer,
  show: showReducer,
  discover: discoverReducer,
  showDetails: showDetailsReducer,
});

const persisted_reducers = persistReducer(persistConfig, reducers);

export const store = createStore(persisted_reducers, applyMiddleware(thunk));
export const persistor = persistStore(store);
