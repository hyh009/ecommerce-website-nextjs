import { SignupInputsState } from "../types";
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