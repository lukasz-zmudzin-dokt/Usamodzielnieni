export const handlePasswordChange = async (object, e) => {
    const url = "http://usamo-back.herokuapp.com/account/password_reset/confirm/";
    console.log(JSON.stringify(object));
    return await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(object)
    }).then(response => {
        console.log(response);
        if (response.status !== 404) return {
            status: response.status,
            ...response.json()
        };
        else return {status: response.status};
    });
};