import React from "react";
import { getUserData } from "Views/UserProfilePage/functions/getUserData.js";
import proxy from "config/api";

describe("getUserData", () => {
  let failFetch;
  let token;
  let userData = {
    data: {
      username: "test_user",
      first_name: "test_firstname",
      last_name: "test_lastname",
      email: "test@example.com",
      phone_numbe: "+48321654987",
    },
  };
  beforeAll(() => {
    token = "123";
    global.fetch = jest.fn().mockImplementation((input, init) => {
      return new Promise((resolve, reject) => {
        if (failFetch) {
          resolve({ status: 500 });
        } else {
          switch (init.method) {
            case "GET":
              resolve({
                status: 200,
                json: () => Promise.resolve(userData),
              });
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
    failFetch = null;
  });

  it("should fetch the data if server response successful", async () => {
    await getUserData(token);
    expect(fetch).toHaveBeenCalledWith(proxy.account + "data", {
      headers: {
        Authorization: "Token 123",
        "Content-Type": "application/json",
      },
      method: "GET",
    });
  });
});
