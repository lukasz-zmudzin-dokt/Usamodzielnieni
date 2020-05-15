import proxy from "config/api";

export const sendMessage = async (token, chatId, msg) => {
  let url = proxy.chat + `${chatId}/`;
  const headers = {
    Authorization: "token " + token,
    "Content-Type": "application/json",
  };
  const response = await fetch(url, { method: "POST", body: msg, headers });

  if (response.status !== 200) {
    throw response.status;
  }
};
