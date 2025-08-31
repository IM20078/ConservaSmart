// Context/Appcontext.tsx
import React, { createContext, useContext, useState } from "react";

type AppContextType = {
  ingredientes: string;
  setIngredientes: React.Dispatch<React.SetStateAction<string>>;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [ingredientes, setIngredientes] = useState<string>("");

  return (
    <AppContext.Provider value={{ ingredientes, setIngredientes }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext debe usarse dentro de un AppProvider");
  }
  return context;
};
