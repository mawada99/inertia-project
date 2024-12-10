import { createContext, useContext } from "react";

const StepperContext = createContext();
export const useStepperContext = () => {
  const context = useContext(StepperContext);
  if (context === "undefined") {
    throw new Error("StepperContext was used outside of the provider");
  }
  return context;
};
export const StepperProvider = ({ children, value }) => {
  return (
    <StepperContext.Provider value={value}>{children}</StepperContext.Provider>
  );
};
