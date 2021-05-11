import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

import { apiReducer } from './ducks/apiSlice';
import { orderReducer } from './ducks/orderSlice';

export const rootReducer = combineReducers({
  api: apiReducer,
  order: orderReducer,
});

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const configureStore = () => {
  return createStore(
    rootReducer,
    composeEnhancers(
      applyMiddleware(
        thunkMiddleware,
      )
    )
  );
};
