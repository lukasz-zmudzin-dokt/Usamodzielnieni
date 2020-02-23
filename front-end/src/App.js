import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { UserProvider } from "context";
import { 
  UserProfilePage, LoginPage, RegisterPage,
  HeaderTemplate, CVEditorPage, Menu, Footer,
} from "Views"

import CVApprovalPage from "./Views/CVApprovalPage";
import MyOffersPage from "./Views/MyOffersPage";

class App extends React.Component {
  render() {
    return (
      <UserProvider>
        <Router>
          <HeaderTemplate />
          <Switch>
            <Route path="/" exact component={Menu} />
            <Route path="/cvEditor" exact component={CVEditorPage} />
            <Route path="/user" exact component={UserProfilePage} />
            <Route path="/login" exact component={LoginPage} />
            <Route path="/newAccount" exact component={RegisterPage} />
            <Route path="/footer" exact component={Footer} />
            <Route path="/cvApproval" exact component={CVApprovalPage} />
            <Route path="/myOffers" exact component={MyOffersPage} />
          </Switch>
        </Router>
      </UserProvider>
    );
  }
}

export default App;
