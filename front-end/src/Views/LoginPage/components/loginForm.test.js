import React from "react";
import LoginForm from "./loginForm";
import {MemoryRouter} from "react-router-dom";
import {render, fireEvent, getAllByPlaceholderText} from "@testing-library/react"
import {UserProvider} from "context/UserContext";
import JobOfferDetails from "Views/JobOfferDetails/JobOfferDetails";

describe('LoginForm', () => {
    let props;

    beforeAll(() => {
        props = {
            data: "",
            onBlur: jest.fn()
        }
    });

    it('should match snapshot', () => {
        const {container} = render(<LoginForm {...props} />);

        expect(container).toMatchSnapshot();
    });

    it('should call onblur with correct credentials', () => {
        const {container, getByPlaceholderText} = render(<LoginForm {...props} />);
        const loginInput = getByPlaceholderText("Login");
        const passwordInput = getByPlaceholderText("Hasło");
        fireEvent.change(loginInput, {target: {
            name: "username",
            value: "testusername"
            }
        });
        fireEvent.change(passwordInput, {target: {
            name: "password",
            value: "testuserpassword"
            }
        });
        expect(props.onBlur).toHaveBeenCalledWith(...props.data, {username: "testusername"});
        expect(props.onBlur).toHaveBeenCalledWith(...props.data, {password: "testuserpassword"});
    });
/*   it('should render correctly', () => {
       const data = {
           username: "qweqwe",
           password: "123123"
       };

       const onBlur = jest.fn();

       const {container} = render(
           <UserProvider>
               <MemoryRouter>
                   <LoginForm data={data} onBlur={onBlur}/>
               </MemoryRouter>
           </UserProvider>
       );

       expect(container).toMatchSnapshot();
   });*/
});