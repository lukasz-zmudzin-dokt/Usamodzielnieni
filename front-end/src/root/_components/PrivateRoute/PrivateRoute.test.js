import React from "react";
import PrivateRoute from "root/_components/PrivateRoute";
import Enzyme, { mount } from "enzyme";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

describe("PrivateRoute test", () => {
  it("should match snapshot", () => {
    const exampleContext = {
      type: "Employer",
      token: "000111222333"
    };
    const ExampleComponent = () => <div>AComponent</div>;
    const exampleProps = {
      path: "/example",
      type: "Employer",
      component: ExampleComponent
    };

    const { container } = render(
      <MemoryRouter initialEntries={["/userProfile"]}>
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
      type: "Employer",
      token: "000111222333"
    };
    const ExampleComponent = () => <div>AComponent</div>;
    const exampleProps = {
      path: "/example",
      type: "Employer",
      component: ExampleComponent
    };

    const enzymeWrapper = mount(
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

    expect(enzymeWrapper.exists(ExampleComponent)).toBe(true);
  });

  it("should render component if user have token and type is not required", () => {
    const exampleContext = {
      type: "Staff",
      token: "000111222333"
    };
    const ExampleComponent = () => <div>AComponent</div>;
    const exampleProps = {
      path: "/example",
      type: null,
      component: ExampleComponent
    };

    const enzymeWrapper = mount(
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

    expect(enzymeWrapper.exists(ExampleComponent)).toBe(true);
  });

  it("should not render component if user isn't logged in ", () => {
    const exampleContext = {
      type: undefined,
      token: undefined
    };
    const ExampleComponent = () => <div>AComponent</div>;
    const exampleProps = {
      path: "/example",
      type: null,
      component: ExampleComponent
    };

    const enzymeWrapper = mount(
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

    expect(enzymeWrapper.exists(ExampleComponent)).toBe(false);
  });

  it("should not render component if user is logged in but have invalid type ", () => {
    const exampleContext = {
      type: "Standard",
      token: "123143"
    };
    const ExampleComponent = () => <div>AComponent</div>;
    const exampleProps = {
      path: "/example",
      type: "Employer",
      component: ExampleComponent
    };

    const enzymeWrapper = mount(
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

    expect(enzymeWrapper.exists(ExampleComponent)).toBe(false);
  });
});
