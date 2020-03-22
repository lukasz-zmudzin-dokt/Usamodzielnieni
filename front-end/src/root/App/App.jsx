import React from "react";
import HeaderTemplate from "Views/PageHeader/headerTemplate";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "context/UserContext";
import Router from "root/Router";

const App = () => (
  <UserProvider>
    <BrowserRouter>
      <HeaderTemplate />
      <Router />
    </BrowserRouter>
  </UserProvider>
);

export default App;