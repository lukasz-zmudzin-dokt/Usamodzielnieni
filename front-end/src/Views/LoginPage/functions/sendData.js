export const sendData = async (credentials, event) => {
  event.preventDefault();
  const url = "https://usamo-back.herokuapp.com/account/login/";
  const response =  await fetch(url, {
    method: "POST",
    body: JSON.stringify(credentials),
    headers: {
      "Content-Type": "application/json",
      Origin: null
    }
  });

  if (response.status === 201) {
    const data = await response.json().then(data => mapData(data));
    return {
      status: response.status,
      ...data
    }
  } else {
    return {status: response.status}
  }
};

const mapData = data => ({
  token: data.token,
  type: data.type
});