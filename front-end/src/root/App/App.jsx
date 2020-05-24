import React from "react";
import { BrowserRouter } from "react-router-dom";
import { UserProvider, AlertProvider } from "context";
import Router from "root/Router";
import { AlertsContainer } from "components";
import Header from "Views/Header";
import Footer from "Views/Footer";

const App = () => {
  return (
    <UserProvider>
      <AlertProvider>
        <BrowserRouter>
          <Header />
          <div className="center-container">
            <Router />
            <AlertsContainer />
          </div>
          <Footer />
        </BrowserRouter>
      </AlertProvider>
    </UserProvider>
  );
};

export default App;
