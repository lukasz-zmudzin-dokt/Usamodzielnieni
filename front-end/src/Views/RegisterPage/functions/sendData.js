
const adjustObject = (account_type, home, company)  => {
    let source;
    let type;
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
        case 'Weryfikacja użytkowników': type = 'staff_verification'; break;
        case 'Weryfikacja CV': type = 'staff_cv'; break;
        case 'Weryfikacja ofert pracy': type = 'staff_jobs'; break;
        case 'Kreator postów na blogu': type = 'staff_blog_creator'; break;
        case 'Moderator bloga': type = 'staff_blog_moderator'; break;
        default: type = undefined;
    }
    return {group_type: type};
};


export const sendData = async (source) => {
    const account_type = source.account_type;
    let url;
    switch (account_type) {
        case "Podopiecznym":
            url = "https://usamo-back.herokuapp.com/account/register/";
            break;
        case "Pracodawcą":
            url = "https://usamo-back.herokuapp.com/account/register/employer/";
            break;
        default:
            url = "https://usamo-back.herokuapp.com/account/register/staff/";
            break;
    }

    const object = {
        ...source.personalData,
        ...source.accountData,
        ...adjustObject(account_type, source.homeData, source.companyData)
    };

    const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(object),
        headers: {
            "Content-Type": "application/json",
            Origin: null
        }
    });

    if (res.status === 201) {
        const data = await res.json().then(data => mapData(data));
        return {
            status: res.status,
            ...data
        }
    } else {
        throw {status: res.status}
    }
};

const mapData = (data) => ({
    token: data.token,
    type: data.type
});