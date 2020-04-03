export const getInterestedPeople = async (token, id) => {
    return await fetch("http://usamo-back.herokuapp.com/job/employer/offer-interested/" + id, {
        method: "GET",
        headers: {
            "Authorization": "token " + token,
            "Content-Type": "application/json"
        }
    })
    .then(res => (res.status === 200 ? res.json() : window.alert("Błąd pobierania danych z serwera.")));
};