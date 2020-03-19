export const sendData = (e, object, token) => {
  const url = "https://usamo-back.herokuapp.com/cv/generate/";
  const headers = {
    Authorization: "Token " + token,
    "Content-Type": "application/json"
  };

  console.log(JSON.stringify(object));
  return fetch(url, { method: "DELETE", headers })
  .then(initialDel => {
    if (initialDel.status === 200 || initialDel.status === 404) {
      return fetch(url, { method: "POST", body: JSON.stringify(object), headers })
      .then(res => {
        if (res.status === 201) {
          return fetch(url, { method: "GET", headers })
          .then(response => {
            if (response.status === 200) {
              response.json().then(file => {
                let cvUrl = "https://usamo-back.herokuapp.com/" + file;
                window.open(cvUrl, "_blank");
              });
            }
          });
        }
      });
    }
  });
};
