import {useState, useEffect, useCallback, Dispatch,SetStateAction} from "react";

type deviceType = "desktop" | "tabletL" | "tablet" | "mobile";
type handleCheckDeviceType = ({setCurrentDevice}:{setCurrentDevice:Dispatch<SetStateAction<deviceType>>})=>void;
const useCheckDevice = ():deviceType=>{
    const [currentDevice, setCurrentDevice] = useState<deviceType>("desktop");

    const handleCheckDevice:handleCheckDeviceType = useCallback(({setCurrentDevice}) => {
        if (window.innerWidth > 1280) {
            setCurrentDevice("desktop");
        } else if (window.innerWidth > 770) {
            setCurrentDevice("tabletL");
        } else if(window.innerWidth > 480) {
            setCurrentDevice("tablet")
        }else {
            setCurrentDevice("mobile")
        }
    },[]);

    useEffect(() => {
      handleCheckDevice({setCurrentDevice});
      window.addEventListener("resize", ()=>{handleCheckDevice({setCurrentDevice})});
      return () => {
        window.removeEventListener("resize", ()=>{handleCheckDevice({setCurrentDevice})});
      };
    }, []);

    return currentDevice

}

export default useCheckDevice;