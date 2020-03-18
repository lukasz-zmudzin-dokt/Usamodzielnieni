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

    const object = {...constObject, ...varObject};
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
                setRedirect(component);
                component.context.login(token);
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