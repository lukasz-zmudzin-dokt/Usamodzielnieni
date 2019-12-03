import React from "react";
import "./App.css";
import UserProfilePage from "Views/UserProfilePage";
import LoginPage from "Views/LoginPage";
import RegisterPage from "Views/RegisterPage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HeaderTemplate from "./Views/PageHeader/headerTemplate";

class App extends React.Component {
  render() { //HeaderTemplate start= obecna ścieżka, isLoggedIn = status do API
    return (
      <div>
        <HeaderTemplate start={"/."} isLoggedIn={true}/>
        <br/><br/><br/>
        <Router>
          <Switch>
            <Route path="/user" exact component={UserProfilePage} />
            <Route path="/login" exact component={LoginPage} />
            <Route path="/newAccount" exact component={RegisterPage} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
