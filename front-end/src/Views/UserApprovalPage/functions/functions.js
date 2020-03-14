export const acceptUser = (e, id) => {
    e.preventDefault();
    console.log("akceptuję usera o id: " + id);
};

export const rejectUser = (e, id) => {
    e.preventDefault();
    console.log("odrzucam usera o id: " + id);
};