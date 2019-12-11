export const SET_USER_TOKEN = 'SET_USER_TOKEN';

export function setUserToken(token) {
    return { type: SET_USER_TOKEN, token };
}