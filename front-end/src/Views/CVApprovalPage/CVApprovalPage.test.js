import React from "react";
import { render } from "@testing-library/react";
import CVApprovalPage from "./CVApprovalPage";
import renderer from "react-test-renderer";

describe("CVApproval", () => {
  it("should render without crashing", () => {
      render(<CVApprovalPage />);
  });
  it("should look like snapshot", () => {
      const profile = renderer.create(<CVApprovalPage />).toJSON();
      expect(profile).toMatchSnapshot();
  });

});