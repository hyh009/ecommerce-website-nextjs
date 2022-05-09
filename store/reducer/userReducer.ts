import {
    createSlice,
    createAsyncThunk
  } from '@reduxjs/toolkit';
import { IUser } from '../../types/auth';
import { axiosInstance } from '../../utils/config';


const handlePending = (state: UserState) => {
  state.isLoading = true;
}

  // declaring the types for our state
  export type UserState = {
    _id:string,
    isLoading:boolean,
  };
  
  const initialState: UserState = {
    _id:"",
    isLoading:false
  };
  
  export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        
    },
    // for server side
    extraReducers: builder => {

    }
  });

  export const {

  } = userSlice.actions;
  

  
  // exporting the reducer here, as we need to add this to the store
  export default userSlice.reducer;