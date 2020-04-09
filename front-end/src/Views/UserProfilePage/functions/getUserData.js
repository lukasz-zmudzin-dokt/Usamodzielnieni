export const getUserData = async (token) => {

    const url = "https://usamo-back.herokuapp.com/account/data";
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        "Authorization": "Token " + token,
        "Content-Type": "application/json"
      }
    });
  
    if (response.status === 200) {
      return response;
    } else {
      return response.status;
    }
  };