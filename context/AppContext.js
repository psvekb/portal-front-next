import { createContext, useContext, useMemo } from "react";
import { useState } from "react";

const AppContext = createContext();
export function AppWrapper({ children }) {
  const [appState, setAppState] = useState({
    upsFamily: "E3M",
    upsFullPower: 0,
    loadPowerFactor: 1,
    batteryRuntime: 5,
  });
  const contextValue = useMemo(() => {
    return [appState, setAppState];
  }, [appState, setAppState]);

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}
export function useAppContext() {
  return useContext(AppContext);
}
