import proxy from "config/api";

const domain = proxy.cv;
const url = {
  generate: id => `${domain}generator/${ id ? id + '/' : '' }`,
  picture: id => `${domain}picture/${id}/`
}
const getHeaders = (token) => ({ Authorization: "Token " + token, "Content-Type": "application/json" });

const generateCv = async (token, object) => {
  const headers = getHeaders(token);
  const res = await fetch(url.generate(), { method: "POST", body: JSON.stringify(object), headers });

  if (res.status === 201) {
    return res.json();
  } else {
    throw res.status;
  }
}

const getCv = async (token, id) => {
  const headers = getHeaders(token);
  const res = await fetch(url.generate(id), { method: "GET", headers })

  if (res.status === 200) {
    return res.json();
  } else {
    throw res.status;
  }
}

const addPhoto = async (token, photo, cvId) => {
  const formData = new FormData();
  formData.append('picture', photo, photo.name);
  const photoRes = await fetch(
    url.picture(cvId), 
    { method: "POST", body: formData, headers: { Authorization: "Token " + token } }
  )

  if (photoRes.status === 201) {
    return;
  } else {
    throw photoRes.status;
  }
}

const sendData = async (object, photo, token) => {
  let file;
  try {
    let cvRes = await generateCv(token, object);
    if (photo) {
      await addPhoto(token, photo, cvRes.cv_id);
    }
    file = await getCv(token, cvRes.cv_id);
  } catch (e) {
    throw new Error('api error');
  }
  const cvUrl = `${proxy.plain}${file.substring(1)}`;
  window.open(cvUrl, "_blank");
};

const getFeedback = async (token, id) => {
  try {
    //const id = await getCvId(token, 0);
    const url = `${domain}feedback/${id}`;
    const headers = getHeaders(token);
    const response = await fetch(url, { method: "GET", headers });

    if (response.status === 200) {
      return await response.json();
    } else {
      throw response.status;
    }
  } catch(e) {
    throw e;
  }
};

export {sendData, getFeedback};