import React from "react";
import { render } from "@testing-library/react";
import CVApprovalPage from "./CVApprovalPage";

describe("CVApproval", () => {
  test("should match with snapshot", () => {
      const { profile } = render ( <CVApprovalPage /> );
      expect(profile).toMatchSnapshot();
  });

});