import proxy from "config/api";

const getSteps = async (token) => {
  let url = `${proxy.steps}`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Token " + token,
  };
  const response = await fetch(url, { method: "GET", headers });
  if (response.status !== 200) {
    throw response.status;
  }
  let list = await response.json();
  list = mapSteps(list);

  return list;
};

const mapSteps = (list) => {
  let unpacked = [];

  list.forEach((main) => {
    main.type = "main";
    unpacked.push(main);
    main.substeps.forEach((sub) => {
      sub.type = "sub";
      unpacked.push(sub);
    });
  });
  return unpacked.map((step) => {
    return {
      id: step.id,
      type: step.type,
      title: step.title,
      description: step.description,
      next: getNext(step, unpacked),
      video: step.video?.split("=")[step.video.split("=").length - 1],
    };
  });
};

const getNext = (step, list) => {
  let next = [];
  if (step.type === "main") {
    if (step.substeps.length > 0) {
      next.push({ id: step.substeps[0].id, choiceName: "Następny krok" });
    }
    step.children.forEach((child) => {
      next.push({ id: child.id, choiceName: child.title });
    });
  } else {
    let parent = list.find((s) => s.id === step.parent);
    if (step.order + 1 < parent.substeps.length) {
      next = [
        { id: parent.substeps[step.order + 1].id, choiceName: "Następny krok" },
      ];
    } else {
      next = getNext(parent, list);
      next.splice(0, 1);
    }
  }
  return next;
};

export const loadSteps = async (
  setSteps,
  setPath,
  setRoot,
  setError,
  token
) => {
  let res;
  try {
    res = await getSteps(token);
    if (res.length === 1) {
      setPath([]);
      setSteps([]);
      setRoot(res[0]);
      return;
    }
    let r = res[0];
    res.splice(0, 1);
    setRoot(r);
    setPath([r.next[0].id]);
    setSteps(res);
  } catch (e) {
    setError(true);
    return;
  }
};
