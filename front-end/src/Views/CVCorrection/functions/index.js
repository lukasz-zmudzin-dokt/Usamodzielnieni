import proxy from "config/api";

const getCV = async (id, token) => {
  const res = await fetch(`${proxy.cv}generator/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Origin: null,
      Authorization: `Token ${token}`,
    },
  });
  if (res.status !== 200) {
    throw Error("getTypes");
  } else {
    return res.json();
  }
};

export { getCV };
