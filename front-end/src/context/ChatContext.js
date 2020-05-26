import React, {
  createContext,
  useEffect,
  useState,
  useContext,
  useRef,
} from "react";
import proxy from "config/api";
import { UserContext } from "context";

const getChats = async (token, filters) => {
  let url = `${proxy.chat}?page=${filters.page}&page_size=${filters.pageSize}`;
  const headers = {
    Authorization: "Token " + token,
    "Content-Type": "application/json",
  };

  const response = await fetch(url, { method: "GET", headers });

  if (response.status === 200) {
    return response.json().then((chats) => chats);
  } else {
    throw response.status;
  }
};

export const ChatContext = createContext(null);

export const ChatProvider = (props) => {
  const user = useContext(UserContext);
  const [chats, setChats] = useState([]);
  const [isChatsLoading, setIsChatsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [count, setCount] = useState(0);
  const [filters, setFilters] = useState({
    page: 1,
    pageSize: 10,
  });
  const socket = useRef(null);

  useEffect(() => {
    const loadChats = async (token) => {
      setIsChatsLoading(true);
      let loadedChats;
      try {
        loadedChats = await getChats(token, filters);
      } catch (e) {
        console.log(e);
        loadedChats = { count: 0, results: [] };
        setError(true);
      }
      setChats(loadedChats.results);
      setCount(loadedChats.count);
      setIsChatsLoading(false);
    };
    loadChats(user.token);
  }, [filters, user.token]);

  console.log(chats);

  useEffect(() => {
    if (socket.current) {
      socket.current.close();
      socket.current = null;
      //   console.log("xd");
    }
    if (user.token && user.type) {
      const url = proxy.wsChat;
      console.log(url);
      console.log("xd2");
      try {
        socket.current = new WebSocket(url, user.token);
        socket.current.onopen = (e) => {
          console.log("udało się", e);
          console.log(JSON.stringify({ message: "threads" }));
          // socket.current.send(JSON.stringify({ message: "threads" }));
        };

        socket.current.onmessage = (msg) => {
          console.log(msg, JSON.parse(msg.data));
        };
        // socket.current.onerror = (e) => {
        //   console.log(e);
        //   setError(true);
        // };
        // socket.current.onclose = (e) => {
        //   console.log(e);
        // };
      } catch (e) {
        console.log(e);
      }
    }
  }, [user.token, user.type]);

  const loadMoreMessages = async () => {
    let res;
    try {
      res = await getChats(user.token, { ...filters, page: filters.page + 1 });
    } catch (e) {
      setError(true);
      return;
    }
    console.log([...chats, ...res.results]);
    setChats([...chats, ...res.results]);
  };

  const data = { chats, error, count, loadMoreMessages };

  return <ChatContext.Provider value={data} {...props} />;
};
