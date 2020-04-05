const domain = "https://usamo-back.herokuapp.com/";
const url = {
  generate: id => `${domain}cv/generator/${ id ? id + '/' : '' }`,
  picture: id => `${domain}cv/picture/${id}/`
}
const getHeaders = (token) => ({ Authorization: "Token " + token, "Content-Type": "application/json" });

const deleteCv = async (token) => {
  const headers = getHeaders(token);
  const res = await fetch(url.generate(), { method: "DELETE", headers });

  if (res.status === 200 || res.status === 404) {
    return;
  } else {
    throw res.status;
  }
}

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
  console.log(JSON.stringify(object));

  let file;
  try {
    await deleteCv(token);
    let cvRes = await generateCv(token, object);
    if (photo) {
      await addPhoto(token, photo, cvRes.cv_id);
    }
    file = await getCv(token, cvRes.cv_id);
  } catch (e) {
    throw new Error('api error');
  }
  const cvUrl = `${domain}${file.substring(1)}`;
  window.open(cvUrl, "_blank");
};

const getCvId = async (token, cvNumber) => {
  const url = `${domain}cv/user/list`;
  const headers = getHeaders(token);
  const response = await fetch(url, {method: "GET", headers});
  
  if(response.status === 200) {
    const cvList = await response.json();
    const cv = cvList[cvNumber];
    const cvId = cv.cv_id;
    return cvId;
  } else {
    throw response.status;
  }
}

const getFeedback = async (token) => {
  try {
    const id = await getCvId(token, 0);
    const url = `${domain}cv/feedback/${id}`;
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