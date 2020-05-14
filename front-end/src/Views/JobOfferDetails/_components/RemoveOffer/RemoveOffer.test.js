import React from "react";
import { render, fireEvent, waitForElement } from "@testing-library/react";
import RemoveOffer from "./RemoveOffer";

let mock_apiError = false;
jest.mock("../../functions/deleteOffer", () => ({
  deleteOffer: (id, token) => {
    if (mock_apiError) {
      throw Error("err");
    }
    return;
  },
}));

describe("RemoveOffer", () => {
  let props;

  beforeAll(() => {
    props = {
      id: "123",
      user: { token: "abc" },
    };
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render without crashing", () => {
    const { container } = render(<RemoveOffer {...props} />);

    expect(container).toMatchSnapshot();
  });

  it("should render success alert when api returns success", async () => {
    const { getByText } = render(<RemoveOffer {...props} />);

    fireEvent.click(getByText("Usuń ofertę"));
    fireEvent.click(getByText("Tak"));

    await waitForElement(() =>
      getByText("Pomyślnie usunięto ofertę", { exact: false })
    );

    expect(
      getByText("Pomyślnie usunięto ofertę", { exact: false })
    ).toBeInTheDocument();
  });

  it("should render error alert when api throws error", async () => {
    mock_apiError = true;
    const { getByText } = render(<RemoveOffer {...props} />);

    fireEvent.click(getByText("Usuń ofertę"));
    fireEvent.click(getByText("Tak"));

    await waitForElement(() =>
      getByText("Wystąpił błąd przy usuwaniu oferty", { exact: false })
    );

    expect(
      getByText("Wystąpił błąd przy usuwaniu oferty", { exact: false })
    ).toBeInTheDocument();
  });
});
