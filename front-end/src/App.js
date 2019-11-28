import React from "react";
import "./App.css";
import CVEditorPage from "Views/CVEditorPage";
import {BrowseRouter as Router, Route, Switch } from "react=router-dom";

class App extends React.Component {
  render() {
    return (
        <div>
            <Router>
                <Switch>
                    <Route path="/" exact component={CVEditorPage} /> <!-- nadpisywać tylko tę linijkę do routera po merge'u + importy-->
                </Switch>
            </Router>
        </div>
    );
  }
}

export default App;
