import React from 'react';
import { render, fireEvent, wait, waitForElement } from '@testing-library/react';
import CommentForm from './CommentForm';
import { UserProvider } from "context";

describe('CommentForm', () => {
    let props, failFetch, user;
    
    beforeAll(() => {
        user = {
            type: 'Standard',
            token: '123',
            data: {
                first_name: 'Jan',
                last_name: 'Kowalski'
            }
        }
    })

    describe('create comment', () => {
        beforeEach(() => {
            jest.clearAllMocks();
            failFetch = false;
            global.fetch = jest.fn().mockImplementation((input, init) => {
                return new Promise((resolve, reject) => {
                    if (failFetch) {
                        resolve({ status: 500 });
                    } else {
                        switch (init.method) {
                            case 'POST':
                                resolve({
                                    status: 200,
                                    json: () => Promise.resolve('n1')
                                });
                                break;
                            default:
                                resolve({});
                                break;
                        }
                    }
                });
            });

            props = {
                blogId: 'b1',
                afterSubmit: jest.fn()
            }
        });

        it('should render without crashing', () => {
            const { container } = render(<CommentForm {...props} />);
            expect(container).toMatchSnapshot();
        });

        it('should not call api when comment form is invalid', async () => {
            const { container, getByText } = render(
                <UserProvider value={user}>
                    <CommentForm {...props} />
                </UserProvider>
            );

            fireEvent.click(getByText('Prześlij'))

            expect(container).toMatchSnapshot();
            expect(global.fetch).toHaveBeenCalledTimes(0)
        });

        it('should render success alert when new comment is successfully added', async () => {
            const { getByPlaceholderText, getByText } = render(
                <UserProvider value={user}>
                    <CommentForm {...props} />
                </UserProvider>
            );

            fireEvent.change(
                getByPlaceholderText('Treść komentarza'), 
                { target: { value: 'Treść nowego komentarz' } }
            );

            fireEvent.click(getByText('Prześlij'))

            const successMsg = 'Pomyślnie przesłano komentarz.';
            await waitForElement(() => getByText(successMsg));
            expect(getByText(successMsg)).toBeInTheDocument();
        });

        it('should render error alert when api returns error status', async () => {
            failFetch = true;
            const { getByPlaceholderText, getByText } = render(
                <UserProvider value={user}>
                    <CommentForm {...props} />
                </UserProvider>
            );

            fireEvent.change(
                getByPlaceholderText('Treść komentarza'), 
                { target: { value: 'Treść nowego komentarz' } }
            );

            fireEvent.click(getByText('Prześlij'))

            const errorMsg = 'Wystąpił błąd podczas przesyłania komentarza.';
            await waitForElement(() => getByText(errorMsg));
            expect(getByText(errorMsg)).toBeInTheDocument();
        });
    });

    describe('edit comment', () => {
        beforeEach(() => {
            jest.clearAllMocks();
            failFetch = false;
            global.fetch = jest.fn().mockImplementation((input, init) => {
                return new Promise((resolve, reject) => {
                    if (failFetch) {
                        resolve({ status: 500 });
                    } else {
                        switch (init.method) {
                            case 'PUT':
                                resolve({
                                    status: 200,
                                    json: () => Promise.resolve()
                                });
                                break;
                            default:
                                resolve({});
                                break;
                        }
                    }
                });
            });

            props = {
                blogId: 'b1',
                comment: {
                    id: '123',
                    author: {
                        email: 'mail@mail.pl',
                        firstName: 'Jan',
                        lastName: 'Kowalski'
                    },
                    creationDate: new Date(2020, 10, 4),
                    content: 'Treść komentarza'
                },
                afterSubmit: jest.fn()
            }
        });

        it('should render without crashing', () => {
            const { container } = render(<CommentForm {...props} />);
            expect(container).toMatchSnapshot();
        });
        

        it('should call afterSubmit with new content after comment update', async () => {
            global.Date.now = jest.fn().mockImplementation(() => 1604444400000);
            const { getByPlaceholderText, getByText } = render(
                <UserProvider value={user}>
                    <CommentForm {...props} />
                </UserProvider>
            );

            fireEvent.change(
                getByPlaceholderText('Treść komentarza'), 
                { target: { value: 'Nowa treść komentarza' } }
            );

            fireEvent.click(getByText('Prześlij'))

            await wait(() => expect(props.afterSubmit).toHaveBeenCalledTimes(1));
            expect(props.afterSubmit).toHaveBeenNthCalledWith(1, {
                id: '123',
                author: {
                    email: 'mail@mail.pl',
                    firstName: 'Jan',
                    lastName: 'Kowalski'
                },
                creationDate: new Date(2020, 10, 4),
                content: 'Nowa treść komentarza'
            });
        });
        
        it('should call afterSubmit with old content when cancel button is clicked', async () => {
            const { getByPlaceholderText, getByText } = render(
                <UserProvider value={user}>
                    <CommentForm {...props} />
                </UserProvider>
            );

            fireEvent.change(
                getByPlaceholderText('Treść komentarza'), 
                { target: { value: 'Nowa treść komentarza' } }
            );

            fireEvent.click(getByText('Anuluj'))

            await wait(() => expect(props.afterSubmit).toHaveBeenCalledTimes(1));
            expect(props.afterSubmit).toHaveBeenNthCalledWith(1, {
                id: '123',
                author: {
                    email: 'mail@mail.pl',
                    firstName: 'Jan',
                    lastName: 'Kowalski'
                },
                creationDate: new Date(2020, 10, 4),
                content: 'Treść komentarza'
            });
        });

        it('should render error alert when api returns error status', async () => {
            failFetch = true;
            const { getByPlaceholderText, getByText } = render(
                <UserProvider value={user}>
                    <CommentForm {...props} />
                </UserProvider>
            );

            fireEvent.change(
                getByPlaceholderText('Treść komentarza'), 
                { target: { value: 'Nowa treść komentarza' } }
            );

            fireEvent.click(getByText('Prześlij'))

            const errorMsg = 'Wystąpił błąd podczas przesyłania komentarza.';
            await waitForElement(() => getByText(errorMsg));
            expect(getByText(errorMsg)).toBeInTheDocument();
        });
    });
});