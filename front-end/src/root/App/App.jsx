import React from "react";
import HeaderTemplate from "Views/PageHeader/headerTemplate";
import { BrowserRouter } from "react-router-dom";
import {
  UserProvider,
  AlertProvider,
  NotificationsProvider,
  ChatProvider,
} from "context";
import Router from "root/Router";
import { AlertsContainer } from "components";
import Footer from "Views/Footer";

const App = () => {
  return (
    <UserProvider>
      <AlertProvider>
        <NotificationsProvider>
          <ChatProvider>
            <BrowserRouter>
              <HeaderTemplate />
              <div className="center-container">
                <Router />
                <AlertsContainer />
              </div>
              <Footer />
            </BrowserRouter>
          </ChatProvider>
        </NotificationsProvider>
      </AlertProvider>
    </UserProvider>
  );
};

export default App;
