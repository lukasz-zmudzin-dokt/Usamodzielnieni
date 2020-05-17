import React from "react";
import PrivateRoute from "root/_components/PrivateRoute";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { userTypes } from "constants/userTypes";
import { staffTypes } from "constants/staffTypes";
import { userStatuses } from "constants/userStatuses";

describe("PrivateRoute test", () => {
  it("should match snapshot", () => {
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
      data: { group_type: [staffTypes.CV], status: "verified" },
    };
    const ExampleComponent = () => <div>AComponent</div>;
    const exampleProps = {
      path: "/example",
      type: userTypes.STAFF,
      group: [staffTypes.CV],
      component: ExampleComponent,
    };

    const { getByText } = render(
      <MemoryRouter initialEntries={[exampleProps.path]}>
        <PrivateRoute
          {...exampleProps}
          authenticated={exampleContext}
          redirect="/home"
          group={exampleProps.group}
        />
      </MemoryRouter>
    );

    expect(getByText("AComponent")).toBeInTheDocument();
  });

  it("should render component if type is array(employer/specialist) ", () => {
    const exampleContext = {
      type: userTypes.EMPLOYER,
      token: "123143",
      data: { group_type: [staffTypes.CV], status: "verified" },
    };
    const ExampleComponent = () => <div>AComponent</div>;
    const exampleProps = {
      path: "/example",
      type: [userTypes.EMPLOYER, userTypes.SPECIALIST],
      component: ExampleComponent,
    };

    const { getByText } = render(
      <MemoryRouter initialEntries={[exampleProps.path]}>
        <PrivateRoute
          {...exampleProps}
          authenticated={exampleContext}
          redirect="/home"
          group={exampleProps.group}
        />
      </MemoryRouter>
    );

    expect(getByText("AComponent")).toBeInTheDocument();
  });

  it("should render component if type is array(staff/specialist) ", () => {
    const exampleContext = {
      type: userTypes.STAFF,
      token: "123143",
      data: { group_type: [staffTypes.CV], status: userStatuses.VERIFIED },
    };
    const ExampleComponent = () => <div>AComponent</div>;
    const exampleProps = {
      path: "/example",
      type: [userTypes.EMPLOYER, userTypes.STAFF],
      group: [staffTypes.CV],
      component: ExampleComponent,
    };

    const { getByText } = render(
      <MemoryRouter initialEntries={[exampleProps.path]}>
        <PrivateRoute
          {...exampleProps}
          authenticated={exampleContext}
          redirect="/home"
          group={exampleProps.group}
        />
      </MemoryRouter>
    );

    expect(getByText("AComponent")).toBeInTheDocument();
  });

  it("should not render component if type is array but staff group is invalid(staff/specialist) ", () => {
    const exampleContext = {
      type: userTypes.STAFF,
      token: "123143",
      data: {
        group_type: [staffTypes.BLOG_CREATOR],
        status: userStatuses.VERIFIED,
      },
    };
    const ExampleComponent = () => <div>AComponent</div>;
    const exampleProps = {
      path: "/example",
      type: [userTypes.EMPLOYER, userTypes.STAFF],
      group: [staffTypes.CV],
      component: ExampleComponent,
    };

    const { getByText } = render(
      <MemoryRouter initialEntries={[exampleProps.path]}>
        <PrivateRoute
          {...exampleProps}
          authenticated={exampleContext}
          redirect="/home"
          group={exampleProps.group}
        />
      </MemoryRouter>
    );

    expect(getByText("AComponent")).not.toBeInTheDocument();
  });

  it("should not render component if type is array ", () => {
    const exampleContext = {
      type: userTypes.STAFF,
      token: "123143",
      data: { group_type: [staffTypes.CV], status: userStatuses.VERIFIED },
    };
    const ExampleComponent = () => <div>AComponent</div>;
    const exampleProps = {
      path: "/example",
      type: [userTypes.EMPLOYER, userTypes.SPECIALIST],
      component: ExampleComponent,
    };

    const { queryByText } = render(
      <MemoryRouter initialEntries={[exampleProps.path]}>
        <PrivateRoute
          {...exampleProps}
          authenticated={exampleContext}
          redirect="/home"
          group={exampleProps.group}
        />
      </MemoryRouter>
    );

    expect(queryByText("AComponent")).not.toBeInTheDocument();
  });

  it("should not render component if user isn't verified ", () => {
    const exampleContext = {
      type: userTypes.STANDARD,
      token: "123143",
      data: { status: userStatuses.AWAITING },
    };
    const ExampleComponent = () => <div>AComponent</div>;
    const exampleProps = {
      path: "/example",
      type: [userTypes.STANDARD],
      component: ExampleComponent,
      userVerified: true,
    };

    const { queryByText } = render(
      <MemoryRouter initialEntries={[exampleProps.path]}>
        <PrivateRoute
          {...exampleProps}
          authenticated={exampleContext}
          redirect="/home"
          group={exampleProps.group}
        />
      </MemoryRouter>
    );

    expect(queryByText("AComponent")).not.toBeInTheDocument();
  });
});
