import {getInterestedPeople} from "./getInterestedPeople";

export const loadInterestedPeople = (token, offerId, component) => {
    component.setState({ answers: [], loadingPeople: true} );
    getInterestedPeople(token, offerId).then(r => r !== undefined ? component.setState({loadingPeople: false, answers: r}):component.setState({loadingPeople: false, answers: []}));
};