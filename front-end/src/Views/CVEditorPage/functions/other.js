const domain = "https://usamo-back.herokuapp.com/";
const url = {
  generate: `${domain}cv/generate/`,
  picture: `${domain}cv/picture/`
}
const getHeaders = (token) => ({ Authorization: "Token " + token, "Content-Type": "application/json" });

const deleteCv = async (token) => {
  const headers = getHeaders(token);
  const res = await fetch(url.generate, { method: "DELETE", headers });

  if (res.status === 200 || res.status === 404) {
    return;
  } else {
    throw res.status;
  }
}

const generateCv = async (token, object) => {
  const headers = getHeaders(token);
  const res = await fetch(url.generate, { method: "POST", body: JSON.stringify(object), headers });

  if (res.status === 201) {
    return;
  } else {
    throw res.status;
  }
}

const getCv = async (token) => {
  const headers = getHeaders(token);
  const res = await fetch(url.generate, { method: "GET", headers })

  if (res.status === 200) {
    return res.json();
  } else {
    throw res.status;
  }
}

const addPhoto = async (token, photo) => {
  const formData = new FormData();
  formData.append('picture', photo, photo.name);
  const photoRes = await fetch(
    url.picture, 
    { method: "POST", body: formData, headers: { Authorization: "Token " + token } }
  )

  if (photoRes.status === 201) {
    return;
  } else {
    throw photoRes.status;
  }
}

export const sendData = async (object, photo, token) => {
  console.log(JSON.stringify(object));

  let file;
  try {
    await deleteCv(token);
    await generateCv(token, object);
    if (photo) {
      await addPhoto(token, photo);
    }
    file = await getCv(token);
  } catch (e) {
    throw new Error('api error');
  }
  const cvUrl = `${domain}${file}`;
  window.open(cvUrl, "_blank");
};