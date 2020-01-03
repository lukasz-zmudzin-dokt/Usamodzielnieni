import Cookies from "universal-cookie";
const cookies = new Cookies();

export const sendData = (e, object) => {
  const token = cookies.get("token");
  const url = "https://usamo-back.herokuapp.com/cv/generate/";

  console.log(JSON.stringify(object));
  fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: "Token " + token,
      "Content-Type": "application/json"
    }
  }).then(initialDel => {
    if (initialDel.status === 200 || initialDel.status === 404) {
      fetch(url, {
        method: "POST",
        body: JSON.stringify(object),
        headers: {
          Authorization: "Token " + token,
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      }).then(res => {
        console.log(res);
        if (res.status === 201) {
          fetch(url, {
            method: "GET",
            headers: {
              Authorization: "Token " + token,
              "Content-Type": "application/json"
            }
          }).then(response => {
            if (response.status === 200) {
              response.json().then(file => {
                let cvUrl = "https://usamo-back.herokuapp.com/" + file;
                window.open(cvUrl, "_blank");
                setTimeout(function() {
                  fetch(url, {
                    method: "DELETE",
                    headers: {
                      Authorization: "Token " + token,
                      "Content-Type": "application/json"
                    }
                  }).then(ans => {
                    console.log(ans);
                    if (ans.status === 200) console.log("deleted");
                  });
                }, 300000);
              });
            }
          });
        }
      });
    }
  });
};
