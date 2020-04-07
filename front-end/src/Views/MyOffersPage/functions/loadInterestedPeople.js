import {getInterestedPeople} from "./getInterestedPeople";

export const loadInterestedPeople = (token, offerId, component) => {
    component.setState({ answers: [], loading: true} );
    getInterestedPeople(token, offerId).then(r => r !== undefined ? component.setState({loading: false, answers: r}):component.setState({loading: false, answers: []}));
};