export const sendData = component => {
  const { username, password } = this.state;

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
    if (res.status === 200) {
      res.json().then(responseValue => {
        const { token } = responseValue;
        component.context.login(token);
        component.setRedirect();
      });
    } else {
      component.setState({
        validated: false,
        incorrect: true,
        username: "",
        password: "",
        message: "Coś poszło nie tak"
      });
    }
  });
};