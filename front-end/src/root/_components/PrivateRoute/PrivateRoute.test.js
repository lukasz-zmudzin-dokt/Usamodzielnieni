import React from "react";
import PrivateRoute from "root/_components/PrivateRoute";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import {userTypes} from "constants/userTypes";
import {staffTypes} from "../../../constants/staffTypes";

describe("PrivateRoute test", () => {
  it("should match snapshot", () => {
    const exampleContext = {
      type: userTypes.EMPLOYER,
      token: "000111222333",
    };
    const ExampleComponent = () => <div>AComponent</div>;
    const exampleProps = {
      path: "/example",
      type: "Employer",
      component: ExampleComponent,
    };

    const { container } = render(
      <MemoryRouter initialEntries={[exampleProps.path]}>
        <PrivateRoute
          redirect="/home"
          authenticated={exampleContext}
          path={exampleProps.path}
          type={exampleProps.type}
          component={exampleProps.component}
        />
      </MemoryRouter>
    );
    expect(container).toMatchSnapshot();
  });

  it("should render component if user has been authenticated", () => {
    const exampleContext = {
      type: userTypes.EMPLOYER,
      token: "000111222333",
    };
    const ExampleComponent = () => <div>AComponent</div>;
    const exampleProps = {
      path: "/example",
      type: userTypes.EMPLOYER,
      component: ExampleComponent,
    };

    const { getByText } = render(
      <MemoryRouter initialEntries={[exampleProps.path]}>
        <PrivateRoute
          path={exampleProps.path}
          type={exampleProps.type}
          component={exampleProps.component}
          authenticated={exampleContext}
          redirect="/home"
        />
      </MemoryRouter>
    );

    expect(getByText("AComponent")).toBeInTheDocument();
  });

  it("should render component if user have token and type is not required", () => {
    const exampleContext = {
      type: userTypes.STAFF,
      token: "000111222333",
    };
    const ExampleComponent = () => <div>AComponent</div>;
    const exampleProps = {
      path: "/example",
      type: null,
      component: ExampleComponent,
    };

    const { getByText } = render(
      <MemoryRouter initialEntries={[exampleProps.path]}>
        <PrivateRoute
          path={exampleProps.path}
          type={exampleProps.type}
          component={exampleProps.component}
          authenticated={exampleContext}
          redirect="/home"
        />
      </MemoryRouter>
    );

    expect(getByText("AComponent")).toBeInTheDocument();
  });

  it("should not render component if user isn't logged in ", () => {
    const exampleContext = {
      type: undefined,
      token: undefined,
    };
    const ExampleComponent = () => <div>AComponent</div>;
    const exampleProps = {
      path: "/example",
      type: null,
      component: ExampleComponent,
    };

    const { queryByText } = render(
      <MemoryRouter initialEntries={[exampleProps.path]}>
        <PrivateRoute
          path={exampleProps.path}
          type={exampleProps.type}
          component={exampleProps.component}
          authenticated={exampleContext}
          redirect="/home"
        />
      </MemoryRouter>
    );

    expect(queryByText("AComponent")).not.toBeInTheDocument();
  });

  it("should not render component if user is logged in but have invalid type ", () => {
    const exampleContext = {
      type: userTypes.STANDARD,
      token: "123143",
    };
    const ExampleComponent = () => <div>AComponent</div>;
    const exampleProps = {
      path: "/example",
      type: userTypes.EMPLOYER,
      component: ExampleComponent,
    };

    const { queryByText } = render(
      <MemoryRouter initialEntries={[exampleProps.path]}>
        <PrivateRoute
          path={exampleProps.path}
          type={exampleProps.type}
          component={exampleProps.component}
          authenticated={exampleContext}
          redirect="/home"
        />
      </MemoryRouter>
    );

    expect(queryByText("AComponent")).not.toBeInTheDocument();
  });
  it("should not render component if staff doesnt have required group ", () => {
    const exampleContext = {
      type: userTypes.STAFF,
      token: "123143",
      data: { group_type: [staffTypes.CV] },
    };
    const ExampleComponent = () => <div>AComponent</div>;
    const exampleProps = {
      path: "/example",
      type: userTypes.STAFF,
      group: [staffTypes.BLOG_CREATOR],
      component: ExampleComponent,
    };

    const { queryByText } = render(
      <MemoryRouter initialEntries={[exampleProps.path]}>
        <PrivateRoute
          path={exampleProps.path}
          type={exampleProps.type}
          component={exampleProps.component}
          authenticated={exampleContext}
          redirect="/home"
          group={exampleProps.group}
        />
      </MemoryRouter>
    );
    expect(queryByText("AComponent")).not.toBeInTheDocument();
  });

  it("should render component if staff have required group ", () => {
    const exampleContext = {
      type: userTypes.STAFF,
      token: "123143",
      data: { group_type: [staffTypes.CV] },
    };
    const ExampleComponent = () => <div>AComponent</div>;
    const exampleProps = {
      path: "/example",
      type: "staff",
      group: [staffTypes.CV],
      component: ExampleComponent,
    };

    const { getByText } = render(
      <MemoryRouter initialEntries={[exampleProps.path]}>
        <PrivateRoute
          path={exampleProps.path}
          type={exampleProps.type}
          component={exampleProps.component}
          authenticated={exampleContext}
          redirect="/home"
          group={exampleProps.group}
        />
      </MemoryRouter>
    );

    expect(getByText("AComponent")).toBeInTheDocument();
  });
});
