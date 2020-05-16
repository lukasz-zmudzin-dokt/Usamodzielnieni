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
    throw Error("getCV");
  } else {
    return res.json();
  }
};

const sendFeedback = async (id, token, feedback) => {
  const { schools, skills, languages, experiences } = feedback;
  const body = {
    cv_id: id,
    schools,
    skills,
    languages,
    experiences,
    additional_info: feedback.additionalInfo,
    basic_info: feedback.basicInfo,
  };
  const res = await fetch(`${proxy.cv}admin/feedback/`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      Origin: null,
      Authorization: `Token ${token}`,
    },
  });
  if (res.status !== 201) {
    throw res.status;
  }
  return res.status;
};

export { getCV, sendFeedback };
