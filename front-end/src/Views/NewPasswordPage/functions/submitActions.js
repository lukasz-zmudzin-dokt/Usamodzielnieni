import proxy from "config/api";

export const handlePasswordChange = async (object) => {
  const url = proxy.account + "password_reset/confirm/";
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(object),
  });

  if (res.status === 200) {
    return await res.json();
  } else {
    throw res.status;
  }
};
