import { createContext, useState } from "react";

const MessageContext = createContext();

const MessageContextProvider = ({ children }) => {
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");
  return (
    <MessageContext.Provider
      value={{ message, setMessage, success, setSuccess }}
    >
      {children}
    </MessageContext.Provider>
  );
};

export { MessageContext, MessageContextProvider };
