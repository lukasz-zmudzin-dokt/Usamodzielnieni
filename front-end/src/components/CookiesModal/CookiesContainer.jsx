import React, { useState, useContext } from "react";
import CookiesModal from "./CookiesModal";
import { UserContext } from "context";

const CookiesContainer = () => {
  const [show, setShow] = useState(true);
  const user = useContext(UserContext);
  console.log(user.token);
  return show && !user.token && <CookiesModal hide={() => setShow(false)} />;
};

export default CookiesContainer;
