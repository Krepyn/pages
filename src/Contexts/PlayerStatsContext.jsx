import { createContext, useContext } from "react";

export const playerStatsContext = createContext();

export function usePlayerStatsContext(){
    const tPlayerStatsContext = useContext(playerStatsContext);

    if (tPlayerStatsContext == undefined){
        throw new Error('usePlayerStatsContext must be used with a playerStatsContext.')
    }

    return tPlayerStatsContext
}