import React from "react";
import "./App.css";
import LoginPage from "Views/LoginPage";
import RegisterPage from "Views/RegisterPage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route path="/login" exact component={LoginPage} />
            <Route path="/newAccount" exact component={RegisterPage} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
