export const getCVs = async (token) => {
    return await fetch("http://usamo-back.herokuapp.com/cv/admin/list/", {
        method: "GET",
        headers: {
            "Authorization": "token " + token,
            "Content-Type": "application/json"
        }})
        .then(res => (res.status === 200 ? res : Promise.reject(res)))
        .then(res => res.json());
};