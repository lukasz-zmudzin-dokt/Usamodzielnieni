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
        {contact.first_name} {contact.last_name} {contact.role}{" "}
        {contact.username}
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
    fetchedContacts = [
      {
        username: "siema",
        first_name: "Stachu",
        last_name: "Gdzie",
        type: "piniondze som za las",
      },
      {
        username: "eniu",
        first_name: "Żabson",
        last_name: "Ziomal",
        type: "kompozytor",
      },
    ];
    jest.clearAllMocks();
  });

  // it("should render without crashing", async () => {
  //   const { getByText } = renderWithRouter(<ContactsModalContent />, contextA);
  //   // expect(
  //   //   getByText("Ładowanie listy kontaktów", { exact: false })
  //   // ).toBeInTheDocument();

  //   await waitForElement(() => getByText("Stachu"));

  //   expect(getByText("Żabson", { exact: false })).toBeInTheDocument();
  // });

  it("should match snapshot", async () => {
    const { container } = render(
      <MemoryRouter>
        <ContactsModalContent />
      </MemoryRouter>
    );
    expect(container).toMatchSnapshot();
  });
});
