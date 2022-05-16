import React, { useState, useCallback, createContext, ReactNode, Dispatch, SetStateAction } from "react";

interface Props {
    children:ReactNode;
}

const useValue = () => {
  const [animationShowed, setAnimationShowed] = useState<boolean>(false);
  const [notFirstLoad, setNotFirstLoad] = useState<boolean>(false);
  const changeToNotFirstLoad = useCallback(():void=>{
    setNotFirstLoad(true);
    },[])

    return {
        animationShowed,
        setAnimationShowed,
        notFirstLoad,
        changeToNotFirstLoad
    }
}

const AnimationContext = createContext({} as ReturnType<typeof useValue>)


export const AnimationContentProvider:React.FC<Props> = ({children}) => {

  return (
      <AnimationContext.Provider value={useValue()}>
          {children}
      </AnimationContext.Provider>
  )
}

export default AnimationContext;