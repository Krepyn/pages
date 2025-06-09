import { createContext, useContext } from "react";

export const creationsContext = createContext();

export function useCreationsContext(){
    const tCreationsContext = useContext(creationsContext);

    if (tCreationsContext == undefined){
        throw new Error('useCreationsContext must be used with a creationsContext.')
    }

    return tCreationsContext
}