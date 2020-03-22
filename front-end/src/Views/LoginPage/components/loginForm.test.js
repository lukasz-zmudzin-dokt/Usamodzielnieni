import React from "react";
import LoginForm from "./loginForm";
import {MemoryRouter} from "react-router-dom";
import {render} from "@testing-library/react"
import {UserProvider} from "../../../context/UserContext";
import LoginPage from "../index";

describe('LoginForm', () => {
   beforeEach(() => {
       jest.clearAllMocks();
   });

   it('should render correctly', () => {
       const parent = render(
           <MemoryRouter>
               <LoginPage/>
           </MemoryRouter>
       );

       const {container} = render(
           <UserProvider>
               <MemoryRouter>
                   <LoginForm component={parent}/>
               </MemoryRouter>
           </UserProvider>
       );

       expect(container).toMatchSnapshot();
   });
});