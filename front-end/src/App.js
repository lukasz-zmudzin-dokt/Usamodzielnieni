import React from "react";
import "./App.css";
import UserProfilePage from "Views/UserProfilePage";
import LoginPage from "Views/LoginPage";
import RegisterPage from "Views/RegisterPage";
import HeaderTemplate from "./Views/PageHeader/headerTemplate";
import CVEditorPage from "./Views/CVEditorPage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Footer from "Views/Footer";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "redux/reducer";
import Cookies from "universal-cookie";
import { setUserToken } from "redux/actions";

const cookies = new Cookies();

console.log("NEW STORE");
const store = createStore(reducer);

store.dispatch(setUserToken(cookies.get("token")));

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <HeaderTemplate />
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