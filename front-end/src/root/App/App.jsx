import React from "react";
import { BrowserRouter } from "react-router-dom";
import {
  UserProvider,
  AlertProvider,
  NotificationsProvider,
  ChatProvider,
} from "context";
import Router from "root/Router";
import { AlertsContainer, ScrollToTop, CookiesContainer } from "components";
import Header from "Views/Header";
import Footer from "Views/Footer";

const App = () => {
  return (
    <UserProvider>
      <AlertProvider>
        <ChatProvider>
          <NotificationsProvider>
            <BrowserRouter>
              <CookiesContainer />
              <Header />
              <ScrollToTop />
              <div className="center-container">
                <Router />
                <AlertsContainer />
              </div>
              <Footer />
            </BrowserRouter>
          </NotificationsProvider>
        </ChatProvider>
      </AlertProvider>
    </UserProvider>
  );
};

export default App;
