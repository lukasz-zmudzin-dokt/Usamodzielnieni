
const adjustObject = (account_type, home, company)  => {
    let source;
    switch(account_type) {
        case "Podopiecznym": {
            source = home;
            return({
                facility_name: source.name_of_place,
                facility_address: `${source.city} ${source.street} ${source.city_code}`
            })}
        case "Pracodawcą": {
            source = company;
            return({
                company_name: source.name_of_place,
                company_address: `${source.city} ${source.street} ${source.city_code}`,
                nip: source.company_nip
            })}
        case "Administratorem": {return({

        })}
        default: {
            console.log("Something went wrong");
        }
    }
};


export const sendData = async (source, e) => {
    e.preventDefault();
    const account_type = source.account_type;
    let url;
    switch (account_type) {
        case "Podopiecznym":
            url = "https://usamo-back.herokuapp.com/account/register/";
            break;
        case "Pracodawcą":
            url = "https://usamo-back.herokuapp.com/account/register/employer/";
            break;
        case "Administratorem":
            url = "https://usamo-back.herokuapp.com/account/register/staff/";
            break;
    }

    const object = {
        ...source.personalData,
        ...source.accountData,
        ...adjustObject(account_type, source.homeData, source.companyData)
    };

    console.log(object);
    const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(object),
        headers: {
            "Content-Type": "application/json",
            Origin: null
        }
    });
    console.log(res);
    if (res.status === 201) {
        const data = await res.json().then(data => mapData(data));
        return {
            status: res.status,
            ...data
        }
    } else {
        return {status: res.status}
    }
};

const mapData = (data) => ({
    token: data.token,
    type: data.type
});

//     res.json().then(responseValue => {
//         const { token } = responseValue;
//         setRedirect(component);
//         component.context.login(token);
//         component.setState({
//             validated: false,
//             message: "Udało się zarejestrować! Teraz możesz się zalogować",
//             correct: true,
//             redirect: true
//         });
//     });
// } else {
//     component.setState({
//         validated: false,
//         incorrect: true,
//         message: "Taki użytkownik już istnieje",
//         username: ""
//     });
//     res.json().then(responseValue => {
//         console.log(responseValue);
//     })
// }