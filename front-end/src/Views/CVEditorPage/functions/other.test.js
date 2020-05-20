import { sendData, getFeedback, getCVdata } from "./other.js";
import proxy from "config/api";

describe("ActionWithDate", () => {
  let failFetch;
  let failFetchUrl;
  let cv, file, token;

  beforeAll(() => {
    cv = { name: "Jan Kowalski" };
    file = new File([""], "filename");
    token = "123";
    global.fetch = jest.fn().mockImplementation((input, init) => {
      return new Promise((resolve, reject) => {
        if (init.method === failFetch && input === failFetchUrl) {
          resolve({ status: 500 });
        }
        switch (init.method) {
          case "DELETE":
            resolve({ status: 200 });
            break;
          case "POST":
            resolve(
              init.body
                ? { status: 201, json: () => Promise.resolve({ cv_id: "1" }) }
                : { status: 400 }
            );
            break;
          default:
            resolve({
              status: 200,
              json: () => Promise.resolve("/CV_Jan_Kowalski"),
            });
            break;
        }
      });
    });
  });

  beforeEach(() => {
    failFetch = null;
    failFetchUrl = null;
  });

  it("should call correct url when photo is undefined", async () => {
    global.open = jest.fn();
    await sendData(cv, null, token, "POST");
    await expect(global.open).toHaveBeenCalledWith(
      proxy.plain + "/CV_Jan_Kowalski",
      "_blank"
    );
  });

  it("should call correct url when photo is defined", async () => {
    global.open = jest.fn();
    await sendData(cv, file, token, "POST");
    await expect(global.open).toHaveBeenCalledWith(
      proxy.plain + "/CV_Jan_Kowalski",
      "_blank"
    );
  });

  it("should throw an error when delete api return wrong status", async () => {
    failFetch = "DELETE";
    failFetchUrl = proxy.cv + "generator/";
    await expect(sendData(cv, file, token)).rejects.toThrow("api error");
  });

  it("should throw an error when get api return wrong status", async () => {
    failFetch = "GET";
    failFetchUrl = proxy.cv + "generator/1/";
    await expect(sendData(cv, file, token)).rejects.toThrow("api error");
  });

  it("should throw an error when post cv api return wrong status", async () => {
    failFetch = "POST";
    failFetchUrl = proxy.cv + "generator/";
    await expect(sendData(cv, file, token)).rejects.toThrow("api error");
  });

  it("should throw an error when post photo api return wrong status", async () => {
    failFetch = "POST";
    failFetchUrl = proxy.cv + "picture/1/";
    await expect(sendData(cv, file, token)).rejects.toThrow("api error");
  });
});

describe("getFeedback test", () => {
  let comments = {};
  let failFetch, noneFound;
  beforeAll(() => {
    global.fetch = jest.fn().mockImplementation((input, init) => {
      return new Promise((resolve, reject) => {
        if (failFetch) {
          resolve({ status: 500 });
        } else if (noneFound) {
          resolve({ status: 404, json: () => Promise.resolve({}) });
        } else {
          switch (init.method) {
            case "GET":
              resolve({ status: 200, json: () => Promise.resolve(comments) });
              break;
            default:
              resolve({});
              break;
          }
        }
      });
    });
  });

  beforeEach(() => {
    failFetch = false;
    comments = {
      cv_id: 12,
      basic_info: "dane osobowe ok",
      schools: "ddd",
      experiences: "pracy bra",
      skills: "duzo umiesz",
      languages: "poliglota",
      additional_info: "",
    };
    noneFound = false;
  });

  it("should return comments", async () => {
    expect(getFeedback()).resolves.toEqual(comments);
  });

  it("should throw status 500", async () => {
    failFetch = true;
    let status;
    try {
      await getFeedback();
    } catch (e) {
      status = e;
    }
    expect(status).toEqual(500);
  });

  it("should return empty feedback object if none found", async () => {
    noneFound = true;
    expect(getFeedback()).resolves.toEqual({});
  });
});

describe("cv data loading", () => {
  let token, failFetch, data, id;

  beforeAll(() => {
    token = "123";
    global.fetch = jest.fn().mockImplementation((input, init) => {
      return new Promise((resolve, reject) => {
        if (failFetch) {
          resolve({ status: 500 });
        } else {
          switch (init.method) {
            case "GET":
              resolve({ status: 200, json: () => Promise.resolve(data) });
              break;
            default:
              reject({});
              break;
          }
        }
      });
    });
  });

  beforeEach(() => {
    id = 123;
    failFetch = false;
    data = {
      has_photo: false,
      is_verified: false,
      was_reviewed: true,
      basic_info: {
        first_name: "Jan",
        last_name: "Kowalski",
        date_of_birth: "01-01-2000",
        phone_number: "+48123456789",
        email: "qwe@qwe.qwe",
      },
      schools: [
        {
          name: "szkoła1",
          description: "klasa1",
          startTime: "2016",
          endTime: "2019",
        },
      ],
      experiences: [
        {
          title: "praca1",
          description: "stanowisko1",
          startTime: "2020",
          endTime: null,
        },
      ],
      skills: [{ description: "taniec" }, { description: "śpiew" }],
      languages: [
        {
          name: "angielski",
          level: "A2",
        },
        {
          name: "niemiecki",
          level: "biegły",
        },
      ],
    };
  });

  it("should return correct data", async () => {
    const res = await getCVdata(token, id);

    expect(res).toEqual(data);
  });

  it("should be called with right headers", async () => {
    await getCVdata(token, id);
    await expect(fetch).toHaveBeenCalledWith(proxy.cv + "data/" + id + "/", {
      method: "GET",
      headers: {
        Authorization: "Token " + token,
        "Content-Type": "application/json",
      },
    });
  });

  it("should throw error on api fail", async () => {
    failFetch = true;
    let res;
    try {
      res = await getCVdata(token, id);
    } catch (e) {
      expect(e).toBe(500);
    }
    expect(res).not.toEqual(data);
  });
});
