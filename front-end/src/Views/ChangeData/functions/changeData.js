import proxy from "config/api";

const changeDataObject = (data) => {
  if (data.nip) {
    return {};
  } else {
    const {
      email,
      facility_address,
      facility_name,
      first_name,
      last_name,
      password,
      phone_number,
      username,
    } = data;
    return {
      email,
      facility_address,
      facility_name,
      first_name,
      last_name,
      password,
      phone_number,
      username,
    };
  }
};

const getUserData = async (token, id) => {
  const urlUserData = `${proxy.account}admin/user_details/${id}/`;
  const header = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Origin: null,
      Authorization: `Token ${token}`,
    },
  };
  const res = await fetch(urlUserData, header);
  if (res.status !== 200) {
    throw Error("getUserData");
  }
  return res.json();
};

const sendFixedData = async (token, id, data) => {
  const url = `${proxy.account}admin/user_details/edit/${id}/`;
  const changeData = changeDataObject(data);
  const header = {
    method: "PUT",
    body: JSON.stringify(changeData),
    headers: {
      "Content-Type": "application/json",
      Origin: null,
      Authorization: `Token ${token}`,
    },
  };
  const res = await fetch(url, header);
  if (res.status !== 200) {
    throw Error("sendFixedData");
  }
  return res.status;
};

export { getUserData, sendFixedData };
