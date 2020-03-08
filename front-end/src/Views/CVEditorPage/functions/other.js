import Cookies from "universal-cookie";
const cookies = new Cookies();

export const sendData = (object, photo) => {
  const token = cookies.get("token");
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
          if (photo) {
            const formData = new FormData();
            formData.append('picture', photo, photo.name);
            console.log(formData.getAll('picture'));

            return fetch("https://usamo-back.herokuapp.com/cv/picture/", { 
              method: "POST", 
              body: formData,
              headers: { Authorization: "Token " + token }
            }).then(res => {
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
            }, err => console.log(err))
          } else {
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
        }
      });
    }
  });
};