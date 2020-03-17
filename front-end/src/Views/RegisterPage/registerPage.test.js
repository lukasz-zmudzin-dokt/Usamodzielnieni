import React from "react";
import {fireEvent, render, waitForElement} from "@testing-library/react";
import RegisterPage from "./index.js"

import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from 'redux/reducer';

describe( "RegisterPageTest", () => {
    it("should render without crashing", () => {
        const store = createStore(reducer);
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <RegisterPage />
                </MemoryRouter>
            </Provider>);
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
        const store = createStore(reducer);
        const { container } = render(
            <Provider store={store}>
                <Router>
                    <RegisterPage />
                </Router>
            </Provider>
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
          <MemoryRouter>
              <RegisterPage token={token} />
          </MemoryRouter>
      );

      fireEvent.click(getByText('Rejestracja', {exact: false}));
      await waitForElement(() => getByText('Podaj nazwisko'));
      expect(getByText('Podaj nazwisko')).toBeInTheDocument();
   });
});
