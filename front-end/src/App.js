import React from "react";
import "./App.css";
import LoginPage from "Views/LoginPage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route path="/" exact component={LoginPage} />
            <Route path="/gallery" exact />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
