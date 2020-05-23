import proxy from "config/api";

const changeDataObject = (data) => {
  const { email, first_name, last_name, phone_number, username } = data;
  if (data.nip) {
    const { company_address, company_name, nip } = data;
    return {
      email,
      company_address,
      company_name,
      first_name,
      last_name,
      phone_number,
      username,
      nip,
    };
  } else if (data.facility_name) {
    const { facility_address, facility_name } = data;
    return {
      email,
      facility_address,
      facility_name,
      first_name,
      last_name,
      phone_number,
      username,
    };
  } else {
    const { group_type, picture_url } = data;
    return {
      email,
      first_name,
      last_name,
      username,
      group_type,
      picture_url,
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

const sendFixedData = async (token, id, data, isAdmin) => {
  const url = isAdmin
    ? `${proxy.account}admin/data/edit/`
    : `${proxy.account}admin/user_details/edit/${id}/`;

  const header = {
    method: "PATCH",
    body: JSON.stringify(data),
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

export { getUserData, sendFixedData, changeDataObject };
