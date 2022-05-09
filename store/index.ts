import {
    Action,
    AnyAction,
    combineReducers,
    configureStore,
    ThunkAction,
  } from '@reduxjs/toolkit';
import { createWrapper,HYDRATE } from 'next-redux-wrapper';
import cartReducer,{CartState} from './reducer/cartReducer';
import userReducer, {UserState} from './reducer/userReducer';

export type State = {
  cart: CartState;
  user: UserState;
};

const combinedReducers = combineReducers({
  cart:cartReducer,
  user:userReducer,
});

const reducer = (state: ReturnType<typeof combinedReducers>|undefined, action: AnyAction) => {
  // to fix client side override
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
    return nextState;
  } else {
    return combinedReducers(state, action);
  }
};
  
export const makeStore = () =>configureStore({
  reducer,
  devTools:true,
});

const store = makeStore();


export type AppStore = ReturnType<typeof makeStore>
export type APPState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    APPState,
    unknown,
    Action<string>
  >;

export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });