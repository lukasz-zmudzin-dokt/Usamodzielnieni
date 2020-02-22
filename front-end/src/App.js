import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { UserProvider } from "context";
import { 
  UserProfilePage, LoginPage, RegisterPage, 
  HeaderTemplate, CVEditorPage, Menu, Footer,
  JobOffersPage, JobOfferDetails
} from "Views"

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
            <Route path="/jobOffers" exact component={JobOffersPage} />
            <Route path="/jobOffers/:id" exact component={JobOfferDetails} />
          </Switch>
        </Router>
      </UserProvider>
    );
  }
}

export default App;
