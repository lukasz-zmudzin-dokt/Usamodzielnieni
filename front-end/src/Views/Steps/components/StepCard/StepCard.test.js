import StepCard from "./StepCard";
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { UserContext } from "context/UserContext";
import { staffTypes } from "constants/staffTypes";

describe("StepCardTest", () => {
  let setCurrent, wantsDelete, wantsEdit, step, path, user;
  beforeEach(() => {
    step = {
      id: "2",
      type: "main",
      title: "Tytuł głównego kroku 2 123 123",
      description: "Opis kroku 2 wraz z filmikami.",
      video: "rickrolltylkozahaszowany",
      next: [{ id: "3", choiceName: "Dalej" }],
    };
    path = ["1", "2", "3", "4"];
    setCurrent = jest.fn();
    wantsDelete = jest.fn();
    wantsEdit = jest.fn();
    user = {
      token: "123",
      data: {
        group_type: [],
      },
    };
  });

  it("should match snapshot", () => {
    const { container } = render(
      <StepCard step={step} setCurrent={setCurrent} path={path} />
    );

    expect(container).toMatchSnapshot();
  });

  it("should contain beginning button when last card and no edition options", () => {
    path = ["1", "3", "4", "2"];
    const { getByText, queryByText } = render(
      <UserContext.Provider value={user}>
        <StepCard step={step} setCurrent={setCurrent} path={path} />
      </UserContext.Provider>
    );
    expect(getByText("Początek")).toBeInTheDocument();
    expect(queryByText("Edytuj krok")).not.toBeInTheDocument();
    expect(queryByText("Usuń krok")).not.toBeInTheDocument();
  });

  it("should contain beginning button and edition options", () => {
    path = ["1", "3", "4", "2"];
    user.data.group_type = [staffTypes.BLOG_MODERATOR];

    const { getByText } = render(
      <UserContext.Provider value={user}>
        <StepCard step={step} setCurrent={setCurrent} path={path} />
      </UserContext.Provider>
    );
    expect(getByText("Początek")).toBeInTheDocument();
    expect(getByText("Edytuj krok")).toBeInTheDocument();
    expect(getByText("Usuń krok")).toBeInTheDocument();
  });

  it("should call setCurrent when beginning clicked", () => {
    path = ["1", "3", "4", "2"];
    const { getByText } = render(
      <UserContext.Provider value={user}>
        <StepCard step={step} setCurrent={setCurrent} path={path} />
      </UserContext.Provider>
    );

    fireEvent.click(getByText("Początek"));

    expect(setCurrent).toHaveBeenCalledWith(path[0]);
  });

  it("should call edition and deletion methods", () => {
    path = ["1", "3", "4", "2"];
    user.data.group_type = [staffTypes.BLOG_MODERATOR];
    const { getByText } = render(
      <UserContext.Provider value={user}>
        <StepCard
          step={step}
          setCurrent={setCurrent}
          path={path}
          wantsDelete={wantsDelete}
          wantsEdit={wantsEdit}
        />
      </UserContext.Provider>
    );

    fireEvent.click(getByText("Edytuj krok"));
    fireEvent.click(getByText("Usuń krok"));

    expect(wantsEdit).toHaveBeenCalledWith(true);
    expect(wantsDelete).toHaveBeenCalledWith(true);
  });

  it("should call setCurrent with right params", () => {
    const { getByText } = render(
      <StepCard step={step} setCurrent={setCurrent} path={path} />
    );

    fireEvent.click(getByText("Dalej"));
    const id = step.next.find((child) => child.choiceName === "Dalej").id;

    expect(setCurrent).toHaveBeenCalledWith(id);
  });
});
