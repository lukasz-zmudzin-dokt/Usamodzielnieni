import React from "react";
import "./App.css";
import UserProfilePage from "Views/UserProfilePage";
import LoginPage from "Views/LoginPage";
import RegisterPage from "Views/RegisterPage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Footer from "Views/Footer";

class App extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route path="/user" exact component={UserProfilePage} />
            <Route path="/login" exact component={LoginPage} />
            <Route path="/newAccount" exact component={RegisterPage} />
            <Route path="/footer" exact component={Footer} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
