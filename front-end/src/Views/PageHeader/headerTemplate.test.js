import HeaderTemplate from './headerTemplate';
import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from 'redux/reducer';


it('should render without crashing', () => {
    const store = createStore(reducer);
    render(
        <Provider store={store}>
            <Router>
                <HeaderTemplate />
            </Router>
        </Provider>);
});