import React, {
  createContext,
  useEffect,
  useState,
  useContext,
  useCallback,
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
  const [filters] = useState({
    page: 1,
    pageSize: 10,
  });
  const [activePage, setActivePage] = useState(1);

  useEffect(() => {
    if (user.token) {
      const loadChats = async (token) => {
        setActivePage(1);
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

  const loadMoreMessages = async () => {
    let res;
    try {
      res = await getChats(user.token, { ...filters, page: activePage + 1 });
      setActivePage(activePage + 1);
    } catch (e) {
      setError(true);
      return;
    }

    setChats([...chats, ...res.results]);
  };

  const loadMessages = async (token) => {
    setActivePage(1);
    let res;
    try {
      res = await getChats(token, filters);
    } catch (e) {
      setError(true);
      return;
    }

    setChats(res.results);
  };

  const data = {
    chats,
    error,
    count,
    loadMoreMessages,
    isChatsLoading,
    loadMessages,
  };

  return <ChatContext.Provider value={data} {...props} />;
};
