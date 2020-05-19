import proxy from "config/api";

const sendData = async (token,id step) => {
  const url = `${proxy.steps}edit/${id}`;
  const res = await fetch(url, {
    method: "PUT",
    body: JSON.stringify(step),
    headers: {
      "Content-Type": "application/json",
      Origin: null,
      Authorization: `Token ${token}`,
    },
  });
  if (res.status !== 200) {
    throw Error("editSteps");
  }
  return res.status;
};

export default {sendData};
