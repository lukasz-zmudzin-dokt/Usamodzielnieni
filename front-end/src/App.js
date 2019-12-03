import React from "react";
import "./App.css";
import UserProfilePage from "Views/UserProfilePage";
import LoginPage from "Views/LoginPage";
import RegisterPage from "Views/RegisterPage";
import HeaderTemplate from "./Views/PageHeader/headerTemplate";
import CVEditorPage from "./Views/CVEditorPage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MenuPage from "Views/Footer";

class App extends React.Component {
  render() {
    return (
      <div>
        <HeaderTemplate />
        <Router>
          <Switch>
            <Route path="/cvEditor" exact component={CVEditorPage} />
            <Route path="/user" exact component={UserProfilePage} />
            <Route path="/login" exact component={LoginPage} />
            <Route path="/newAccount" exact component={RegisterPage} />
            <Route path="/menu" exact component={MenuPage} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
