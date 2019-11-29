import React from "react";
import "./App.css";
import CVEditorPage from "Views/CVEditorPage";
import {BrowserRouter as Router, Route, Switch } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
        <div>
            <Router>
                <Switch>
                    <Route path="/" exact component={CVEditorPage} />
                </Switch>
            </Router>
        </div>
    );
  }
}

export default App;
