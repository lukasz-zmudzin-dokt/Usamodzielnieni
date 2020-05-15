import proxy from "config/api";

export const handleConnection = async (email) => {
    const url = proxy.account + "password_reset/";
    const object = {email: email};
    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(object)
    });

    if (res.status === 200) {
        return true;
    } else {
        throw res.status;
    }
};