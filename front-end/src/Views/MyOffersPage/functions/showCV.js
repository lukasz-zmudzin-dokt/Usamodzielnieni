export const showCV = (cvUrl) => {
    let url = "http://usamo-back.herokuapp.com" + cvUrl;
    console.log(url);
    window.open(url, '_blank');
};