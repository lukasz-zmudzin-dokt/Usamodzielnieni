import React from "react";
import "./App.css";
import Cookies from "universal-cookie";
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

const cookies = new Cookies();

class App extends React.Component {
  state = {
    token: cookies.get("token") || ""
  };

  setToken = token => {
    cookies.set("token", token, { path: "/" });
    this.setState({
      token
    });
  };

  render() {
    const { token } = this.state;
    const { setToken } = this;
    return (
      <Provider store={store}>
        <Router>
          <HeaderTemplate />
          <Switch>
            <Route path="/cvEditor" exact component={CVEditorPage} />
            <Route path="/user" exact component={UserProfilePage} />
            <Route
              path="/login"
              exact
              component={() => <LoginPage token={token} setToken={setToken} />}
            />
            <Route
              path="/newAccount"
              exact
              component={() => (
                <RegisterPage token={token} setToken={setToken} />
              )}
            />
            <Route path="/footer" exact component={Footer} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
