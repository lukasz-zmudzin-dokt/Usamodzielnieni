import React from "react";
import {render} from "@testing-library/react";
import RegisterPage from "./index.js"

import { BrowserRouter as Router } from 'react-router-dom';
import { UserProvider } from "context";
import {waitForElement, fireEvent} from "@testing-library/dom";

describe( "RegisterPageTest", () => {
    it("should render without crashing", () => {
        render(
            <UserProvider store={store}>
                <Router>
                    <RegisterPage />
                </Router>
            </UserProvider>);
    });

    it("onClick should be called", async () => {
       const onClick = jest.fn();
       const { component, getByText } = render(<RegisterPage onSubmit={onClick} />);
       component.setState({
           userName: '123'
       });
       fireEvent.click(getByText('Wyślij'));

       await expect(onClick).toHaveBeenCalledWith('123');
    });

    it("should match snapshot", () => {
        const { container } = render(
            <UserProvider>
                <Router>
                    <RegisterPage />
                </Router>
            </UserProvider>
        );
        expect(container).toMatchSnapshot();
    });
});

describe("api connection test", () => {
   let apiFailure;
   let token;
   let apiRegistration;

   beforeAll(() => {
       token = "123";
       global.fetch = jest.fn().mockImplementation((input, init) => {
           return new Promise((resolve, reject) => {
               if (apiFailure) {
                   resolve({status: 500});
               } else if (init.method === "POST") {
                   resolve({
                       status: 200,
                       json: () => Promise.resolve(apiRegistration)
                   });
               } else {
                   reject({});
               }
           })
       })
   });

   it('should get response from api', async () => {
      apiFailure = false;
      const { getByText } = render(
          <Router>
              <RegisterPage token={token} />
          </Router>
      );

      fireEvent.click(getByText('Rejestracja', {exact: false}));
      await waitForElement(() => getByText('Podaj nazwisko'));
      expect(getByText('Podaj nazwisko')).toBeInTheDocument();
   });
});
