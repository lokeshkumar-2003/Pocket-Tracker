import { createContext, useState } from "react";

const ModelContext = createContext();

const ModelContextProvider = ({ children }) => {
  const [type, setType] = useState("");
  return (
    <ModelContext.Provider value={{ type, setType }}>
      {children}
    </ModelContext.Provider>
  );
};

export { ModelContext, ModelContextProvider };
