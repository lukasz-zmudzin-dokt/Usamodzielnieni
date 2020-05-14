import { sendData, getFeedback } from "./other.js";
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
    await sendData(cv, null, token);
    await expect(global.open).toHaveBeenCalledWith(
      proxy.plain + "/CV_Jan_Kowalski",
      "_blank"
    );
  });

  it("should call correct url when photo is defined", async () => {
    global.open = jest.fn();
    await sendData(cv, file, token);
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
  let failFetch;
  beforeAll(() => {
    global.fetch = jest.fn().mockImplementation((input, init) => {
      return new Promise((resolve, reject) => {
        if (failFetch) {
          resolve({ status: 500 });
        } else {
          switch (init.method) {
            case "GET":
              resolve({
                status: 200,
                json: () => Promise.resolve(comments),
              });
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
    comments = {};
  });

  it("should return comments", async () => {
    comments = {
      cv_id: 12,
      basic_info: "dane osobowe ok",
      schools: "ddd",
      experiences: "pracy bra",
      skills: "duzo umiesz",
      languages: "poliglota",
      additional_info: "",
    };
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
});
