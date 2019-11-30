import React from "react";
import "./App.css";
import UserProfilePage from "views/UserProfilePage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route path="/user" exact component={UserProfilePage} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
