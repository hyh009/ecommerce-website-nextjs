import {
    TypedUseSelectorHook,
    useDispatch,
    useSelector,
  } from 'react-redux';
  import type {
    AppDispatch,
    APPState,
  } from '.';
  
  export const useAppDispatch = () => useDispatch<AppDispatch>();
  export const useAppSelector: TypedUseSelectorHook<APPState> = useSelector;