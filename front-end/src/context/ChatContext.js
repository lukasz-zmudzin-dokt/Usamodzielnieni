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
  const [filters] = useState({ //nie wiem jak tu z paginacją, ale nie mam jak sprawdzić bo jest mniej niż 10 osób do których mogę napisać xd
    page: 1,
    pageSize: 10,
  });
  const socket = useRef(null);

  useEffect(() => {
    if (user.token) {
      const loadChats = async (token) => {
        setError(false);
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
    }
  }, [filters, user.token]);

  useEffect(() => {
    if (socket.current) {
      socket.current.close();
      socket.current = null;
    }
    if (user.token && user.type) {
      const url = proxy.wsChat;

      try {
        socket.current = new WebSocket(url, user.token);
        socket.current.onopen = (e) => {
          socket.current.send(JSON.stringify({ message: "threads" }));
        };

        socket.current.onmessage = (msg) => {
          setChats(JSON.parse(msg.data));
        };
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

    setChats([...chats, ...res.results]);
  };

  const data = {
    chats,
    error,
    count,
    socket,
    loadMoreMessages,
    isChatsLoading,
  };

  return <ChatContext.Provider value={data} {...props} />;
};
