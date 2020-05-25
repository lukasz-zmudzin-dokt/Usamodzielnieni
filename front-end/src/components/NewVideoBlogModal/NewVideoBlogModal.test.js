import NewVideoBlogModal from "./NewVideoBlogModal";
import {staffTypes} from "constants/staffTypes";
import React from "react";
import {userTypes} from "constants/userTypes";
import {render, fireEvent, wait} from "@testing-library/react";
import {createMemoryHistory} from 'history';
import {AlertContext} from "context/AlertContext";
import {Router} from "react-router-dom";
import {UserContext} from "context/UserContext";

const renderWithRouter = (
    ui,
    contextA,
    {
        route = "/user",
        history = createMemoryHistory({ initialEntries: [route] }),
    } = {}
) => {
    let context = {
        token: 123,
        type: userTypes.STAFF,
        data: {
            group_type: [staffTypes.BLOG_CREATOR]
        }
    };
    return {
        ...render(
            <UserContext.Provider value={context}>
                    <Router history={history}>{ui}</Router>
            </UserContext.Provider>
        ),
        history,
    };
};

describe("blog modal test", () => {
    let submitFail, photoFail, reserveFail, user, show, setShow, alertC;
    beforeAll(() => {
        global.fetch = jest.fn().mockImplementation((input) => {
            return new Promise((resolve) => {
                if (submitFail || photoFail || reserveFail) {
                    resolve({status: 500})
                } else {
                    switch(input) {
                        case "submit":
                            resolve({status: 200, json: () => Promise.resolve("")});
                            break;
                        case "photo":
                            resolve({status: 200, json: () => Promise.resolve("")});
                            break;
                        default:
                            resolve({status: 201, json: () => Promise.resolve({id: 123123})});
                            break;
                    }
                }
            });
        });
    });

    beforeEach(() => {
        submitFail = false;
        photoFail = false;
        reserveFail = false;
        show = true;
        setShow = jest.fn();
        user = {
            token: 123,
            type: userTypes.STAFF,
            data: {
                group_type: [staffTypes.BLOG_CREATOR]
            }
        };
        alertC = {
            showAlert: jest.fn()
        }
    });

    it('should match snapshot', () => {
        const {getByRole} = render(
            <NewVideoBlogModal user={user} setShow={setShow} show={show} />
        );
        const container = getByRole("dialog");
        expect(container).toMatchSnapshot();
    });

    it('should validate form, render alert and redirect', async () => {
        const {history, getByText, getByLabelText} = renderWithRouter(
            <AlertContext.Provider value={alertC}>
                <NewVideoBlogModal user={user} setShow={setShow} show={show} />
            </AlertContext.Provider>
        );

        fireEvent.change(getByLabelText("Tytuł bloga"), {
            target: {value: "qweqwe"}
        });
        fireEvent.click(getByText("Stwórz nowy wideoblog"));

        await wait(() => expect(fetch).toHaveBeenCalledTimes(2));
        expect(alertC.showAlert).toHaveBeenCalledWith(
            "Pomyślnie założono nowy wideoblog.","success"
        );
        expect(history.location.pathname).toEqual("/blog/blogpost/123123")
    });

});