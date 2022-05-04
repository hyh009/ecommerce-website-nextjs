import {Dispatch, SetStateAction, useRef, useCallback}  from "react";

type setErrorMsgType = Dispatch<SetStateAction<string|null>>|null;

const useControlDialog = (setErrorMsg:setErrorMsgType=null)=>{
    const dialogRef = useRef<HTMLDialogElement>(null);

    const closeDialog = useCallback(():void => {
        if(dialogRef.current!==null){
          dialogRef.current.close();
          if(setErrorMsg){
            setErrorMsg(null);
          }
        }
      },[])

      const openDialog = useCallback(():void=>{
          if(dialogRef.current!==null){
              dialogRef.current.close();
              dialogRef.current.showModal();
          }
      },[]);

      return {closeDialog, openDialog, dialogRef};
}

export default useControlDialog;