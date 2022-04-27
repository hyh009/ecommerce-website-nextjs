import axios from "axios";

function catchError(error:unknown):string{
    let errorMsg:string|undefined;
        if(axios.isAxiosError(error)){
            errorMsg = error.response?.data?.message;
            if(!errorMsg){
                errorMsg = error.response?.data;
            }
        }else{
            console.log(error);
        }
    return errorMsg? errorMsg : "系統發生錯誤，請稍候再試。"
}

export default catchError;