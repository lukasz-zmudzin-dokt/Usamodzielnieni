import { fireEvent, render, waitForElement } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PasswordResetPrompt from "./PasswordResetPrompt";
import React from "react";

describe("PasswordResetPrompt", () => {
  let apiFail;

  beforeAll(() => {
    global.fetch = jest.fn().mockImplementation((input, init) => {
      return new Promise((resolve, reject) => {
        if (apiFail) {
          resolve({ status: 500 });
        } else {
          resolve({ status: 200 });
        }
      });
    });
  });

  beforeEach(() => {
    apiFail = false;
    jest.clearAllMocks();
  });

  it("should match snapshot", () => {
    const { container } = render(
      <MemoryRouter>
        <PasswordResetPrompt />
      </MemoryRouter>
    );
    expect(container).toMatchSnapshot();
  });

  it("should get call from API", async () => {
    const { getByText, getByPlaceholderText } = render(
      <MemoryRouter>
        <PasswordResetPrompt />
      </MemoryRouter>
    );

    fireEvent.change(getByPlaceholderText("Email", { exact: false }), {
      target: { value: "qwe@wp.pl" },
    });

    fireEvent.click(getByText("Wyślij"));
    await waitForElement(() =>
      getByText("Jeżeli Twoje konto istnieje", { exact: false })
    );
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(
      getByText("Jeżeli Twoje konto istnieje", { exact: false })
    ).toBeInTheDocument();
  });

  it("should render alert on api fail", async () => {
    apiFail = true;
    const { getByText, getByPlaceholderText } = render(
      <MemoryRouter>
        <PasswordResetPrompt />
      </MemoryRouter>
    );

    fireEvent.change(getByPlaceholderText("Email", { exact: false }), {
      target: { value: "qwe@wp.pl" },
    });

    fireEvent.click(getByText("Wyślij"));
    await waitForElement(() => getByText("Coś poszło nie tak."));
    expect(getByText("Coś poszło nie tak.")).toBeInTheDocument();
  });

  it("should not call fetch on empty field", () => {
    const { getByText } = render(
      <MemoryRouter>
        <PasswordResetPrompt />
      </MemoryRouter>
    );

    fireEvent.click(getByText("Wyślij"));

    expect(fetch).toHaveBeenCalledTimes(0);
  });
});
