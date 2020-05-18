import React from "react";
import HeaderTemplate from "Views/PageHeader/headerTemplate";
import { BrowserRouter } from "react-router-dom";
import { UserProvider, AlertProvider } from "context";
import Router from "root/Router";
import { AlertsContainer } from "components";

const App = () => {
  return (
    <UserProvider>
      <AlertProvider>
        <BrowserRouter>
          <HeaderTemplate />
          <div className="center-container">
            <Router />
            <AlertsContainer />
          </div>
        </BrowserRouter>
      </AlertProvider>
    </UserProvider>
  );
};

export default App;
