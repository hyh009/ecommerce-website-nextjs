import { SignupInputsState, UpdateUserState } from "../types/auth";
import { axiosInstance } from "./config";
// signup
import catchError from "./catchError";
export const createUser = async (inputData:SignupInputsState):Promise<any> => {
    try{
      const res = await axiosInstance.post("/api/auth/signup",inputData);
      return {success:true, message:res.data};
  
    }catch(error){

     const errorMsg = catchError(error)
      
      return {
        success:false,
        message: errorMsg
      }
    }
  }

export const updateUser = async (userId:string, inputData:UpdateUserState):Promise<any>=>{
    try{
      const res = await axiosInstance.patch(`/api/user/find/${userId}`, inputData);
      return {success:true, updatedUser:res.data};
    }catch(error){
      const errorMsg = catchError(error);
      return {success:false, errorMsg};
    }
}

export const getUser = async (userId:string, controller:AbortController):Promise<any>=>{
    try{
      const res = await axiosInstance.get(`/api/user/find/${userId}`, {signal:controller.signal});
      return {success:true, user:res.data};
    }catch(error){
      const errorMsg = catchError(error);
      return {success:false, errorMsg};
    }
}