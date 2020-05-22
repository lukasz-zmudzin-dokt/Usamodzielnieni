import {userTypes} from "constants/userTypes";
import {staffTypes} from "constants/staffTypes";
import { render, fireEvent, waitForElement, wait } from "@testing-library/react";
import {NewContact, showNewContactForm} from "./NewContact";
import React from "react";



describe("NewContact test", () => {
    let apiFail, user, show, setShow, setContacts, alertC;

    const test = <button onClick={showNewContactForm}>Pokaż modal</button>;

    beforeAll(() => {
        global.fetch = jest.fn().mockImplementation(() => {
            return new Promise((resolve) => {
                if (apiFail) {
                    resolve({status: 500});
                } else {
                    resolve({status: 201, json: () => Promise.resolve("asd")})
                }
            });
        });
    });

    beforeEach(() => {
        user = {
            token: 123,
            type: userTypes.STAFF,
            data: {
                group_type: [staffTypes.BLOG_MODERATOR]
            }
        };
        show = true;
        setShow = jest.fn();
        setContacts = jest.fn();
        alertC = {
            showAlert: jest.fn()
        };
    });

    it('should match snapshot', async () => {
        const {container} = render(
            <NewContact
                user={user}
                show={show}
                setShow={setShow}
                setContacts={setContacts}
                alertC={alertC}
            />
        );

        await expect(container).toMatchSnapshot();
    });
});