import React from "react";
import "./App.css";
import UserProfilePage from "Views/UserProfilePage";
import LoginPage from "Views/LoginPage";
import RegisterPage from "Views/RegisterPage";
import HeaderTemplate from "./Views/PageHeader/headerTemplate";
import CVEditorPage from "./Views/CVEditorPage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Footer from "Views/Footer";
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from "redux/reducer";

console.log("NEW STORE");
const store = createStore(reducer);

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <HeaderTemplate />
        <Router>
          <Switch>
            <Route path="/cvEditor" exact component={CVEditorPage} />
            <Route path="/user" exact component={UserProfilePage} />
            <Route path="/login" exact component={LoginPage} />
            <Route path="/newAccount" exact component={RegisterPage} />
            <Route path="/footer" exact component={Footer} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
