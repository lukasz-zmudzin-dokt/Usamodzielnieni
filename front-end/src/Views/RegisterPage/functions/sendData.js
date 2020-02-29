import { setRedirect } from "./handlers";
import Cookies from "universal-cookie";
const cookies = new Cookies();


export const sendData = (component, constObject, varObject) => {
    console.log(constObject + varObject);
    let url;
    switch (component.state.account_type) {
        case "Podopiecznym": url = "https://usamo-back.herokuapp.com/account/register/"; break;
        case "Pracodawcą": url = "https://usamo-back.herokuapp.com/account/register/employer/"; break;
        case "Administratorem": url = "https://usamo-back.herokuapp.com/account/register/staff/"; break;
    }
    console.log("i\'m in the method to seek response");
    const object = {...constObject, ...varObject};
    console.log(object);
    console.log(url);
    fetch(url, {
        method: "POST",
        body: JSON.stringify(object),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => {
        console.log("request sent");
        console.log(res);
        if (res.status === 201) {
            console.log("response received");
            res.json().then(responseValue => {
                const { token } = responseValue;
                setRedirect(component);
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