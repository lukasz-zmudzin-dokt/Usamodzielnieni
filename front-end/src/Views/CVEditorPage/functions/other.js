const domain = "https://usamo-back.herokuapp.com/";
const url = {
  generate: id => `${domain}cv/generator/${ id ? id + '/' : '' }`,
  picture: id => `${domain}cv/picture/${id}/`
}
const getHeaders = (token) => ({ Authorization: "Token " + token, "Content-Type": "application/json" });

const generateCv = async (token, object, method, id) => {
  const headers = getHeaders(token);
  const link = id !== undefined ? domain + 'cv/data/' + id + '/' : url.generate();
  const res = await fetch(link, { method: method, body: JSON.stringify(object), headers });
  const status = id !== undefined ? 200 : 201;
  if (res.status === status) {
    return res.json();
  } else {
    throw res.status;
  }
}

const fetchDocument = async (token, id) => {
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

const sendData = async (object, photo, token, method, id) => {
  let file;
  try {
    let cvRes = await generateCv(token, object, method, id);
    if (photo) {
      await addPhoto(token, photo, cvRes.cv_id);
    }
    const cvId = id !== undefined ? id : cvRes.cv_id;
    file = await fetchDocument(token, cvId);
  } catch (e) {
    throw new Error('api error');
  }
  const cvUrl = `${domain}${file.substring(1)}`;
  window.open(cvUrl, "_blank");
};

const getFeedback = async (token, id) => {
  try {
    //const id = await getCvId(token, 0);
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

const getCVdata = async (token, id) => {
  const url = `${domain}cv/data/${id}/`;
  const headers = getHeaders(token);
  const res = await fetch(url, {method: "GET", headers});

  if (res.status === 200) {
    return await res.json();
  } else {
    throw res.status;
  }
};

const getPhoto = async (token, id) => {
  const url = `${domain}cv/picture/${id}/`;
  const headers = getHeaders(token);
  const res = await fetch(url, {method: "GET", headers});

  if (res.status === 200) {
    return await res.json();
  } else {
    return null;
  }
};

export {sendData, getFeedback, getCVdata, getPhoto};