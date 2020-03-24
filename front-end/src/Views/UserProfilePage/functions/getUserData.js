export const getUserData = async (token, component) => {

    const url = "http://usamo-back.herokuapp.com/account/data";
    console.log(token);
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        "Authorization": "token " + token,
        "Content-Type": "application/json"
      }
    }).then(response => {
      // if (!response.ok) throw new Error(response.status);
      return response;
    });
    const data = await response.json();
    console.log(data);
    console.log(data.data);
    console.log(data.data.first_name);
    component.setState({
      user: {
        username: data.data.username,
        firstName: data.data.first_name,
        lastName: data.data.last_name,
        email: data.data.email,
        phoneNumber: data.data.phone_number
      }
    });
};

