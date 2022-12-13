import {createStore, combineReducers, compose, applyMiddleware} from 'redux';

import {authReducer} from './reducers/auth';
import thunk from 'redux-thunk';
import {persistStore} from 'redux-persist';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth'],
};

const rootReducer = combineReducers({
  auth: authReducer,
});

const persistRootReducer = persistReducer(persistConfig, rootReducer);

let composeEnhancers = compose;

if (__DEV__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const middlewares = [thunk];

export const configureStore = createStore(
  persistRootReducer,
  composeEnhancers(applyMiddleware(...middlewares)),
);

export const persistedStore = persistStore(configureStore);

// export default configureStore;
