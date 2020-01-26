export default function fetch(input, init) {
    return new Promise((resolve, reject) => {
        if (input !== "https://usamo-back.herokuapp.com/cv/generate/") {
            reject({ error: "Wrong URL" });
        }
        switch (init.method) {
            case "DELETE":
                resolve({ status: 404 });
                break;
            case "POST":
                resolve({ status: init.body ? 201 : 400 });
                break;
            default:
                resolve({ 
                    status: 200,
                    json: () => Promise.resolve("CV_Jan_Kowalski")
                });
                break;
        }
    });
}