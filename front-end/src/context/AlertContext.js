import React, { useState, createContext } from "react";

export const AlertContext = createContext({
  open: false,
  message: "",
  setOpen: () => {},
});

export const AlertProvider = (props) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState("danger") // success
  const data = {
    open,
    message,
    variant,
    changeVisibility: () => setOpen(true),
    changeMessage: (newMessage,newVariant = variant) => {
      setOpen(false);
      setMessage(newMessage);
      setVariant(newVariant);
    },
  };
  return <AlertContext.Provider value={data} {...props} />;
};
