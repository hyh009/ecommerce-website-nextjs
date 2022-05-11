import {useEffect, useRef} from "react";



export const useKeyboardEventListener = (
    eventName: 'keydown' | 'keyup',
    handler: ({key} : KeyboardEvent) => void,
  ) => {
    const savedHandler = useRef<(e:KeyboardEvent) => void>(handler)
  
    useEffect(() => {
      savedHandler.current = handler
    }, [handler])
  
    useEffect(() => {
      const eventListener = (e: KeyboardEvent) => savedHandler.current(e)
  
      window.addEventListener(eventName, eventListener);
  
      return () => {
        window.removeEventListener(eventName, eventListener)
      }
    }, [eventName])
  }


  export const useEventListener = (
    eventName: string,
    handler: (e:Event) => void,
  ) => {
    const savedHandler = useRef<(e:Event) => void>(handler)
  
    useEffect(() => {
      savedHandler.current = handler
    }, [handler])
  
    useEffect(() => {
      const eventListener = (e:Event) => savedHandler.current(e)
  
      window.addEventListener(eventName, eventListener);
  
      return () => {
        window.removeEventListener(eventName, eventListener)
      }
    }, [eventName])
  }