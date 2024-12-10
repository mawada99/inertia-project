import { createContext, useContext } from "react";

const TabsContext = createContext();
export const useTabsContext = () => {
  const context = useContext(TabsContext);
  if (context === "undefined") {
    throw new Error("TabsContext was used outside of the provider");
  }
  return context;
};
export const TabsProvider = ({ children, value }) => {
  return <TabsContext.Provider value={value}>{children}</TabsContext.Provider>;
};
