export const getCVs = async (token) => {
    return await fetch("http://usamo-back.herokuapp.com/cv/admin/list/unverified/", {
        method: "GET",
        headers: {
            "Authorization": "token " + token,
            "Content-Type": "application/json"
        }})
        .then(res => (res.status === 200 ? res.json() : window.alert("Wystąpił błąd podczas pobierania danych.")));
};