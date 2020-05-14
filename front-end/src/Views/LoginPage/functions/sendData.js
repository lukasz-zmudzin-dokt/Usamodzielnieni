import proxy from "config/api";

export const sendData = async (credentials) => {
  const url = proxy.account + "login/";
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(credentials),
    headers: {
      "Content-Type": "application/json",
      Origin: null,
    },
  });

  if (response.status === 201) {
    const data = await response.json().then((data) => data);
    return {
      status: response.status,
      ...data,
    };
  } else {
    throw response.status;
  }
};
