import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { ApiActionTypes } from '../ducks/apiSlice';
import { OrderActionTypes } from '../ducks/orderSlice';
import { rootReducer } from '../store';

export type RootThunkAction = ThunkAction<void, RootState, unknown, Action<string>>;

export type RootState = ReturnType<typeof rootReducer>;

export type RootActionTypes = ApiActionTypes | OrderActionTypes;
