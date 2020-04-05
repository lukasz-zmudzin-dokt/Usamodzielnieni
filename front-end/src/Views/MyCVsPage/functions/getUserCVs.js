export const getUserCVs = async (token) => {
    return await fetch("http://usamo-back.herokuapp.com/cv/user/list/", {
        method: "GET",
        headers: {
            "Authorization": "token " + token,
            "Content-Type": "application/json"
        }})
        .then(res => (res.status === 200 ? res.json() : window.alert("Ups! Coś poszło nie tak, spróbuj później")));
};