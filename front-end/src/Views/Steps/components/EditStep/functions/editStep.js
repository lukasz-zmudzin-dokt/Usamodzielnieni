import proxy from "config/api";

const editStep = async (token, isStep, data, id) => {
  const url = `${proxy.steps}${isStep ? "step" : "substep"}/${id}/update/`;
  if (data.video === "") {
    data.video = null;
  }
  const headers = {
    "Content-Type": "application/json",
    Origin: null,
    Authorization: `Token ${token}`,
  };

  const res = await fetch(url, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers,
  });

  if (res.status !== 200) {
    throw await res.json();
  }
  return await res.json();
};

export { editStep };
