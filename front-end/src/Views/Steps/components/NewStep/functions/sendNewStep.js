import proxy from "config/api";

const sendNewStep = async (token, isStep, data) => {
  const url = `${proxy.steps}${isStep ? "step" : "substep"}/`;
  if (data.video === "") {
    data.video = null;
  }
  const headers = {
    "Content-Type": "application/json",
    Origin: null,
    Authorization: `Token ${token}`,
  };

  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers,
  });

  if (res.status !== 201) {
    throw await res.json();
  }

  return await res.json();
};

export { sendNewStep };
