import { deleteOffer } from "./deleteOffer";

describe("deleteOffer", () => {
  let id, token, failFetch;

  beforeAll(() => {
    id = "123";
    token = "abc";

    global.fetch = jest.fn().mockImplementation((input, init) => {
      return new Promise((resolve, reject) => {
        if (failFetch) {
          resolve({ status: 500 });
        } else {
          switch (init.method) {
            case "DELETE":
              resolve({ status: 200 });
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
  });

  it("should return success", async () => {
    await expect(deleteOffer(id, token)).resolves.toEqual(200);
  });

  it("should throw status 500", async () => {
    failFetch = true;
    await expect(deleteOffer(id, token)).rejects.toThrow("500");
  });
});
