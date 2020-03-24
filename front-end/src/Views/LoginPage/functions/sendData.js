import {setRedirect} from "./handlers";

export const sendData = component => {
  const { username, password } = component.state.credentials;
  console.log(component.state);

  const url = "https://usamo-back.herokuapp.com/account/login/";
  fetch(url, {
    method: "POST",
    body: JSON.stringify({
      username,
      password
    }),
    headers: {
      "Content-Type": "application/json",
      Origin: null
    }
  }).then(res => {
    console.log(res);
    if (res.status === 201) {
      res.json().then(responseValue => {
        const { token, type } = responseValue;
        component.context.login(token, type);
        setRedirect(component);
      });
    } else {
      component.setState({
        validated: false,
        incorrect: true,
        username: "",
        password: "",
        message: "Coś poszło nie tak"
      });
      res.json().then(response => {
        console.log(response);
        console.log(component.state);
      })
    }
  });
};