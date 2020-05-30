import React, { useContext } from "react";
import { Form, Col } from "react-bootstrap";
import { UserContext } from "context";
import proxy from "config/api";

const NotificationsCheckbox = () => {
  const userContext = useContext(UserContext);

  const notificationsOn = async (token) => {
    let url = `${proxy.notification}start-daily/`;
    const headers = {
        Authorization: "Token " + token,
        "Content-Type": "application/json",
      };

    const response = await fetch(url, { method: "POST", headers });
    
    if (response.status === 200) {
        return console.log("spoko")
      }  else {
        throw response.status;
      }
  };

  const notificationsOff = async (token) => {
    let url = `${proxy.notification}stop-daily/`;
    const headers = {
        Authorization: "Token " + token,
        "Content-Type": "application/json",
      };
    const response = await fetch(url, { method: "POST", headers });
    
    if (response.status === 200) {
        return console.log("spoko")
      }  else {
        throw response.status;
      }
  };

  const handleChange = (e) => {
    if (e.target.checked) {
      notificationsOn(userContext.token);
    } else {
      notificationsOff(userContext.token);
    }
  };

  return (
    <Col>
      <Form>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check
            type="switch"
            label="Chcę otrzymywać powiadomienia na maila"
            onChange={(e) => handleChange(e)}
          />
        </Form.Group>
      </Form>
    </Col>
  );
};

export default NotificationsCheckbox;
