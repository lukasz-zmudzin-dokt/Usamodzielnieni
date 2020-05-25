import React from "react";
import HeaderTemplate from "Views/PageHeader/headerTemplate";
import { BrowserRouter } from "react-router-dom";
import { UserProvider, AlertProvider, NotificationsProvider } from "context";
import Router from "root/Router";
import { AlertsContainer } from "components";
import Footer from "Views/Footer";

const App = () => {
  return (
    <UserProvider>
      <AlertProvider>
        <NotificationsProvider>
          <BrowserRouter>
            <HeaderTemplate />
            <div className="center-container">
              <Router />
              <AlertsContainer />
            </div>
            <Footer />
          </BrowserRouter>
        </NotificationsProvider>
      </AlertProvider>
    </UserProvider>
  );
};

export default App;
