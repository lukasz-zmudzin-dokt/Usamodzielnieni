import { staffTypes } from "constants/staffTypes";
import proxy from "config/api";

const adjustObject = (account_type, home, company, role) => {
  let source;
  switch (account_type) {
    case "Podopiecznym": {
      source = home;
      return {
        facility_name: source.name_of_place,
        facility_address: {
          city: source.city,
          street: source.street,
          street_number: source.number,
          postal_code: source.city_code,
        },
      };
    }
    case "Pracodawcą": {
      source = company;
      return {
        company_name: source.name_of_place,
        company_address: {
          city: source.city,
          street: source.street,
          street_number: source.number,
          postal_code: source.city_code,
        },
        nip: source.company_nip,
      };
    }
    default:
      if(role !== null) {
        return { group_type: account_type, role: role };
      } else {
        return { group_type: account_type };
      }

  }
};

const checkIfArrayIncludes = (src, target) => {
  for (let i = 0; i < src.length; i++) {
    if (target.includes(src[i])) {
      return true;
    }
  }
  return false;
};

export const sendData = async (token, source) => {
  const account_type = source.account_type;
  let url;
  const staff_types = Object.values(staffTypes);
  let wants_data = true;
  if (account_type === "Podopiecznym") {
    url = proxy.account + "register/";
  } else if (account_type === "Pracodawcą") {
    url = proxy.account + "register/employer/";
  } else if (checkIfArrayIncludes(account_type, staff_types)) {
    url = proxy.account + "register/staff/";
  } else {
    throw new Error();
  }

  const object = {
    ...source.personalData,
    ...source.accountData,
    ...adjustObject(
      account_type,
      source.homeData,
      source.companyData,
      source.role
    ),
  };
  const header =
    token !== undefined
      ? {
          Authorization: "Token " + token,
          "Content-Type": "application/json",
          Origin: null,
        }
      : {
          "Content-Type": "application/json",
          Origin: null,
        };
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify(object),
    headers: header,
  });
  if (res.status === 201) {
    const data = await res.json().then((data) => mapData(data));
    let response = { data: {} };
    if (wants_data) {
      const dataRes = await fetch(proxy.account + "data", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + data.token,
        },
      });
      if (dataRes.status === 200) {
        response = await dataRes.json();
      } else {
        throw dataRes.status;
      }
    }
    return {
      status: res.status,
      ...data,
      data: response.data,
    };
  } else {
    throw await res.json();
  }
};

const mapData = (data) => ({
  token: data.token_data.token,
  type: data.type,
});
