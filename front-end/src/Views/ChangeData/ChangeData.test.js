import React from "react";
import {
  render,
  waitForElement,
  fireEvent,
  wait,
} from "@testing-library/react";
import ChangeData from "./ChangeData";
import { createMemoryHistory } from "history";
import { UserContext, AlertContext } from "context";
import { Router } from "react-router-dom";

// jest.mock("./components", () => ({
//   CompanyForm: () => <div>Company</div>,
//   FacilityForm: () => <div>Facility</div>,
// }));

const renderWithRouter = (
  ui,
  alertC,
  {
    route = "/changeData/abc",
    history = createMemoryHistory({ initialEntries: [route] }),
  } = {}
) => {
  let context = {
    token: "abc",
  };
  return {
    ...render(
      <AlertContext.Provider value={alertC}>
        <UserContext.Provider value={context}>
          <Router history={history}>{ui}</Router>
        </UserContext.Provider>
      </AlertContext.Provider>
    ),
    history,
  };
};

describe("ChangeData", () => {
  let failPut;
  let failGet;
  let data = {
    first_name: "user",
    last_name: "user",
    phone_number: "+48123123123",
    facility_name: "abc",
    facility_address: {
      city: "new",
      street: "city",
      street_number: "12",
      postal_code: "12-123",
    },
  };
  let alertC = {
    showAlert: jest.fn(),
  };
  beforeAll(() => {
    global.fetch = jest.fn().mockImplementation((input, init) => {
      return new Promise((resolve, reject) => {
        switch (init.method) {
          case "PUT":
            if (failPut) {
              resolve({ status: 500 });
            } else resolve({ status: 200 });
            break;
          case "GET":
            if (failGet) {
              resolve({ status: 500 });
            } else resolve({ status: 200, json: () => Promise.resolve(data) });
            break;
          default:
            reject({});
            break;
        }
      });
    });
  });

  beforeEach(() => {
    data = {
      first_name: "user",
      last_name: "user",
      phone_number: "+48123123123",
      facility_name: "abc",
      facility_address: {
        city: "new",
        street: "city",
        street_number: "12",
        postal_code: "12-123",
      },
    };
  });

  it("should match snapshot", async () => {
    const { container, getByText } = renderWithRouter(<ChangeData />);

    await waitForElement(() => getByText("Adres placówki"));

    expect(container).toMatchSnapshot();
  });

  it("should redirect after sending data(facility form)", async () => {
    const { getByText, history, getByLabelText } = renderWithRouter(
      <ChangeData />,
      alertC
    );

    await waitForElement(() => getByText("Adres placówki"));

    fireEvent.change(getByLabelText("Imię"), {
      target: { value: "abc" },
    });
    fireEvent.change(getByLabelText("Nazwisko"), {
      target: { value: "abc" },
    });
    fireEvent.change(getByLabelText("Numer telefonu"), {
      target: { value: "adsasd" },
    });
    fireEvent.change(getByLabelText("Nazwa placówki"), {
      target: { value: "asdad" },
    });
    fireEvent.change(getByLabelText("Ulica"), {
      target: { value: "ges" },
    });
    fireEvent.change(getByLabelText("Numer budynku"), {
      target: { value: "cde" },
    });
    fireEvent.change(getByLabelText("Nazwa miasta"), {
      target: { value: "abc" },
    });
    fireEvent.change(getByLabelText("Kod pocztowy"), {
      target: { value: "21-115" },
    });
    fireEvent.click(getByText("Prześlij zmiany"));

    await wait(() => {
      expect(fetch).toHaveBeenCalled();
    });

    await wait(() => expect(alertC.showAlert).toHaveBeenCalled());

    expect(alertC.showAlert).toHaveBeenCalledWith(
      "Udało się przesłać poprawione dane.",
      "success"
    );

    expect(history.location.pathname).toEqual("/userList");
  });

  it("should redirect after sending data(company form)", async () => {
    data = {
      first_name: "user",
      last_name: "user",
      phone_number: "+48123123123",
      company_name: "abc",
      company_address: {
        city: "new",
        street: "city",
        street_number: "12",
        postal_code: "12-123",
      },
      nip: "123123123",
    };
    const { getByText, history, getByLabelText } = renderWithRouter(
      <ChangeData />,
      alertC
    );

    await waitForElement(() => getByText("Adres firmy"));

    fireEvent.change(getByLabelText("Imię"), {
      target: { value: "abc" },
    });
    fireEvent.change(getByLabelText("Nazwisko"), {
      target: { value: "abc" },
    });
    fireEvent.change(getByLabelText("Numer telefonu"), {
      target: { value: "adsasd" },
    });
    fireEvent.change(getByLabelText("Nazwa firmy"), {
      target: { value: "asdad" },
    });
    fireEvent.change(getByLabelText("Ulica"), {
      target: { value: "ges" },
    });
    fireEvent.change(getByLabelText("Numer budynku"), {
      target: { value: "cde" },
    });
    fireEvent.change(getByLabelText("Nazwa miasta"), {
      target: { value: "abc" },
    });
    fireEvent.change(getByLabelText("Kod pocztowy"), {
      target: { value: "21-115" },
    });
    fireEvent.click(getByText("Prześlij zmiany"));

    await wait(() => {
      expect(fetch).toHaveBeenCalled();
    });

    await wait(() => expect(alertC.showAlert).toHaveBeenCalled());

    expect(alertC.showAlert).toHaveBeenCalledWith(
      "Udało się przesłać poprawione dane.",
      "success"
    );
    expect(history.location.pathname).toEqual("/userList");
  });

  it("should redirect after click back button", async () => {
    const { getByText, history } = renderWithRouter(<ChangeData />);

    await waitForElement(() => getByText("Adres placówki"));

    fireEvent.click(getByText("<"));

    expect(history.location.pathname).toEqual("/userList");
  });

  it("should render CompanyForm when nip is in data", async () => {
    data = {
      first_name: "user",
      last_name: "user",
      phone_number: "+48123123123",
      company_name: "abc",
      company_address: {
        city: "new",
        street: "city",
        street_number: "12",
        postal_code: "12-123",
      },
      nip: "123123123",
    };
    const { getByText } = renderWithRouter(<ChangeData />);

    await waitForElement(() => getByText("Adres firmy"));
  });

  it("should render fail message if api fails", async () => {
    failGet = true;
    const { getByText } = renderWithRouter(<ChangeData />);

    await waitForElement(() =>
      getByText("Nie udało się pobrać danych użytkownika.")
    );
  });

  it("should render fail send message if api fails", async () => {
    failPut = true;
    const { getByText } = renderWithRouter(<ChangeData />, alertC);

    fireEvent.click(getByText("Prześlij zmiany"));

    await wait(() => expect(alertC.showAlert).toHaveBeenCalled());

    expect(alertC.showAlert).toHaveBeenCalledWith(
      "Nie udało się przesłać danych."
    );
  });
});
