import React, {
    useState,
    useContext,
    useEffect,
    useRef,
    createContext,
  } from "react";
import { UserContext } from "context";
import proxy from "config/api";
import { paths } from "constants/paths";
import { userTypes } from "constants/userTypes";
import { compile } from "path-to-regexp";

export const ChatContext = createContext(null);

export const ChatProvider = (contact) => {
    const [chatList, setChatList] = useState(null);
    const [count, setCount] = useState(null);
    const [next, setNext] = useState();
    const [error, setError] = useState(false);
    const socket = useRef();

    const user = useContext(UserContext);

    useEffect(() => {
        if (socket.current) {
            socket.current.close();
            socket.current = null;
        }
        if (user.token && user.type) {
            const url = proxy.wsChat + contact;
            socket.current = new WebSocket(url, user.token);
            socket.current.onopen = (e) => console.log("POŁĄCZONO");
            /*socket.current.onmessage = (e) => {
            };
            socket.current.onerror = (e) => {
              console.log(e);
              setError(true);
            };*/
        }
    }, [user.token, user.type]);
/*
    const data = {
        messages,
        error,
        next,
        socket,
        sendMessage: async () => {
            
        }
    }*/
}