import proxy from "config/api"

export const deleteStep = async (steps, stepId, token) => {
  console.log(stepId);
  let toDelete = steps.find((s) => s.id === stepId);
  let url;
  const headers = {
    Authorization: "Token " + token,
    "Content-Type": "application/json",
  };

  if(toDelete.type === "main") {
    url = `${proxy.steps}step/${stepId}/delete/`;
  } else {
    url = `${proxy.steps}substep/${stepId}/delete/`;
  }

  const response = await fetch(url, { method: "DELETE", headers });

  return response;
}