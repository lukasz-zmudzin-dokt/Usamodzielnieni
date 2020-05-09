import proxy from "config/api";

export const deleteCV = async (token, cv_id) => {
    const response =  await fetch(proxy.cv + "generator/" + cv_id + "/", {
        method: "DELETE",
        headers: {
            "Authorization": "token " + token,
            "Content-Type": "application/json"
        }}
    );

    if (response.status === 200) {
        return true;
    } else {
        throw response.status;
    }


};