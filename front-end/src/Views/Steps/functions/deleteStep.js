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
  /*let parents = findParents(steps, step);

  if (step.type === "main") {
    deleteSubsteps(steps, step, setSteps);
    let next = step.next.length > 0 ? step.next[0] : undefined;
    parents.forEach((parent) => {
      let stepPtr = parent.next.find((el) => el.id === step.id);
      parent.next.splice(parent.next.indexOf(stepPtr), 1);
      if (
        next &&
        !parent.next
          .map((n) => {
            return n.id;
          })
          .includes(next.id) &&
        next.id !== parent.id
      ) {
        parent.next.push(next);
      }
    });
  } else {
    let parent = parents[0];
    let next = step.next.length > 0 ? step.next[0] : undefined;
    let stepPtr = parent.next.find((el) => el.id === step.id);
    parent.next.splice(parent.next.indexOf(stepPtr), 1);
    if (
      next &&
      !parent.next
        .map((n) => {
          return n.id;
        })
        .includes(next.id) &&
      next.id !== parent.id
    ) {
      parent.next.push(next);
    }
  }
  steps.splice(steps.indexOf(step), 1);
  setSteps(steps);
};

const deleteSubsteps = (steps, step, setSteps) => {
  let nextSteps;
  while (true) {
    nextSteps = step.next.map((n) => {
      return n.id;
    });
    if (nextSteps.length > 0) {
      let substep = undefined;
      steps.forEach((element) => {
        if (nextSteps.includes(element.id) && element.type === "sub") {
          substep = element.id;
        }
      });
      if (!substep) {
        return;
      }
      substep = steps.find((s) => s.id === substep);
      deleteStep(steps, substep, setSteps);
    } else {
      return;
    }
  }
};

export const findParents = (steps, step) => {
  let parents = [];
  steps.forEach((element) => {
    let next = element.next.map((n) => {
      return n.id;
    });
    if (next.length > 0 && next.includes(step.id)) {
      parents.push(element);
    }
  });

  return parents;
};*/
