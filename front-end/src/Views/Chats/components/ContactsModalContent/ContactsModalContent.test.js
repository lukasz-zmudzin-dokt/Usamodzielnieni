import React from "react";
import { render, fireEvent, waitForElement } from "@testing-library/react";
import ContactsModalContent from "./ContactsModalContent";
import { MemoryRouter, Router } from "react-router-dom";
import Contact from "./Contact/Contact";
import { UserContext, AlertContext } from "context";

jest.mock("./Contact/Contact");

const renderWithRouter = (ui, contextA, {} = {}) => {
  let context = {
    token: 123,
    data: {
      company_name: "abc",
      company_address: {
        street: "def",
        street_number: "1",
        city: "abc",
        postal_code: "00-000",
      },
    },
  };
  return {
    ...render(
      <UserContext.Provider value={context}>
        <AlertContext.Provider value={contextA}>
          <Router>{ui}</Router>
        </AlertContext.Provider>
      </UserContext.Provider>
    ),
  };
};

describe("ContactsModalContent", () => {
  let failFetch = false;
  let fetchedContacts = [];
  let context;
  let contextA;

  beforeAll(() => {
    Contact.mockImplementation(({ contact }) => (
      <div>
        {contact.data.first_name} {contact.data.last_name} {contact.data.role}
        {contact.data.username}
      </div>
    ));
    global.fetch = jest.fn().mockImplementation((input, init) => {
      return new Promise((resolve, reject) => {
        if (failFetch) {
          resolve({ status: 500 });
        } else if (init.method === "GET") {
          resolve({
            status: 200,
            json: () => Promise.resolve(fetchedContacts),
          });
        } else {
          reject({});
        }
      });
    });
  });

  beforeEach(() => {
    failFetch = false;
    fetchedContacts = {
      count: 2,
      results: [
        {
          username: "siema",
          first_name: "Stachu",
          last_name: "Gdzie",
          group_type: ["staff_chat_access"],
          role: "piniondze som za las",
          picture_url: null,
        },
        {
          username: "eniu",
          first_name: "Żabson",
          last_name: "Ziomal",
          role: "kompozytor",
          group_type: ["staff_chat_access"],
          picture_url: null,
        },
      ],
    };

    jest.clearAllMocks();
  });

  it("should match snapshot", async () => {
    const { container, getByText } = render(
      <MemoryRouter>
        <ContactsModalContent />
      </MemoryRouter>
    );
    await waitForElement(() => getByText("1"));
    expect(container).toMatchSnapshot();
  });
});
