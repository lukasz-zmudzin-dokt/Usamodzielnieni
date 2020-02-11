export const sendData = (component, object) => {
    console.log(object);
    const url = "https://usamo-back.herokuapp.com/account/register/";
    fetch(url, {
        method: "POST",
        body: JSON.stringify(object),
        headers: {
            "Content-Type": "application/json",
            Origin: null
        }
    }).then(res => {
        console.log(res);
        if (res.status === 201) {
            res.json().then(responseValue => {
                const { token } = responseValue;
                component.setRedirect();
                cookies.set(`token`, token, {
                    path: "/"
                });
                component.props.setUserToken(token);
                component.setState({
                    validated: false,
                    message: "Udało się zarejestrować! Teraz możesz się zalogować",
                    email: "",
                    first_name: "",
                    last_name: "",
                    username: "",
                    phone_number: "",
                    password: "",
                    passwordR: "",
                    city: "",
                    city_code: "",
                    street: "",
                    name_of_place: "",
                    correct: true,
                    redirect: true
                });
            });
        } else {
            component.setState({
                validated: false,
                incorrect: true,
                message: "Taki użytkownik już istnieje",
                username: ""
            });
        }
    });
};