import React from "react";
import { render, fireEvent, waitForElement } from "@testing-library/react";
import ContactsModalContent from "./ContactsModalContent";
import { MemoryRouter } from "react-router-dom";
import Contact from "./Contact/Contact";

jest.mock("./Contact/Contact");

describe("ContactsModalContent", () => {
  let failFetch = false;
  let fetchedContacts = [];

  beforeAll(() => {
    Contact.mockImplementation(({ contact }) => (
      <div>
        {contact.first_name} {contact.last_name} {contact.role}
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
        id: "1",
        first_name: "Stachu",
        last_name: "Gdzie",
        role: "piniondze som za las",
      },
      {
        id: "420",
        first_name: "Żabson",
        last_name: "Ziomal",
        role: "kompozytor",
      },
    ];
    jest.clearAllMocks();
  });

  it("should render without crashing", async () => {
    const { getByText } = render(
      <MemoryRouter>
        <ContactsModalContent />
      </MemoryRouter>
    );
    // expect(
    //   getByText("Ładowanie listy kontaktów", { exact: false })
    // ).toBeInTheDocument();

    await waitForElement(() => getByText("Stachu"));

    expect(getByText("Żabson", { exact: false })).toBeInTheDocument();
  });

  it("should match snapshot", async () => {
    const { container } = render(
      <MemoryRouter>
        <ContactsModalContent />
      </MemoryRouter>
    );
    expect(container).toMatchSnapshot();
  });
});
