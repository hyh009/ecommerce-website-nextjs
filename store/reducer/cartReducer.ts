import {
    createSlice,
    PayloadAction, 
    createAsyncThunk
  } from '@reduxjs/toolkit';
import { ICart, ICartProduct } from '../../types/cart';
import { axiosInstance } from '../../utils/config';
  
export const getCart = createAsyncThunk(
  "cart/getCart", // name of function
  async(userId:string):Promise<ICart> => {
    const {data:cart} = await axiosInstance.get<ICart>(`/api/cart/${userId}`);
    return cart;
  }
);

export const createCart = createAsyncThunk(
  "cart/createCart",
  async(cart:ICart):Promise<ICart> => {
      const {data:newCart} = await axiosInstance.post<ICart>(`/api/cart/${cart.user}`,cart);
      return newCart;
  }
);

export const updateCart = createAsyncThunk(
  "cart/updateCart",
  async(cart:ICart):Promise<ICart> => {
      const {data:newCart} = await axiosInstance.patch<ICart>(`/api/cart/${cart.user}`,cart);
      return newCart;
  }
)
// declaring the types for our state
export type CartState = {
  products: ICartProduct[],
  quantity: number,
  isLoading:boolean,
};

const initialState: CartState = {
  products: [],
  quantity: 0,
  isLoading:false
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    getLocalSavedCart:(state:CartState)=>{
      const cartString = localStorage.getItem("cart");
      if(cartString){
        const cart = JSON.parse(cartString);
        state.products = cart.products;
        state.quantity = cart.quantity;
      }
    },
    cleanupNotLoginCart: (state:CartState) => {
        state.products = [];
        state.quantity = 0;
        localStorage.removeItem("cart");
      },
    updateNotLoginCart: (state:CartState,action:PayloadAction<{products:ICartProduct[]}>)=>{
        state.products = action.payload.products;
        state.quantity = action.payload.products.length;
        // save to localstorage
        localStorage.setItem("cart", JSON.stringify(state));
    },
  },
  // for server side
  extraReducers: builder => {
    builder.addCase(getCart.pending,(state:CartState)=>{
      state.isLoading = true;
    }),
    builder.addCase(getCart.fulfilled,(state:CartState,action)=>{
      state.products = action.payload.products;
      state.quantity = action.payload.quantity;
      state.isLoading = false;
    }),
    builder.addCase(getCart.rejected,(state:CartState)=>{
      state.isLoading = false;
    }),
    builder.addCase(createCart.fulfilled,(state:CartState,action)=>{
      state.products = action.payload.products;
      state.quantity = action.payload.quantity;
      state.isLoading = false;

    }),
    builder.addCase(updateCart.fulfilled,(state:CartState,action)=>{
      state.products = action.payload.products;
      state.quantity = action.payload.quantity;
      state.isLoading = false;
    })
  }
});

export const {
  getLocalSavedCart,
  cleanupNotLoginCart,
  updateNotLoginCart,
} = cartSlice.actions;



// exporting the reducer here, as we need to add this to the store
export default cartSlice.reducer;