import React, { useState, createContext } from "react";

export const AlertContext = createContext({
  open: false,
  message: "",
  setOpen: () => {},
});

export const AlertProvider = (props) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const data = {
    open,
    message,
    changeVisibility: (newOpen) => setOpen(newOpen),
    changeMessage: (newMessage) => setMessage(newMessage),
  };
  return <AlertContext.Provider value={data} {...props} />;
};
