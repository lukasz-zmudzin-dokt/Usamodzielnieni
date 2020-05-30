import React, { useState } from "react";
import { Form, Col } from "react-bootstrap";

import proxy from "config/api";

const NotificationsCheckbox = ({ token, is_subscribed }) => {
  const [isSubbed, setIsSubbed] = useState(is_subscribed);
  const notificationsOn = async (token) => {
    let url = `${proxy.notification}start-daily/`;
    const headers = {
      Authorization: "Token " + token,
      "Content-Type": "application/json",
    };

    const response = await fetch(url, { method: "POST", headers });

    if (response.status === 200) {
      setIsSubbed(true);
    } else {
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
      setIsSubbed(false);
    } else {
      throw response.status;
    }
  };

  const handleChange = (e) => {
    if (e.target.checked) {
      notificationsOn(token);
    } else {
      notificationsOff(token);
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
            checked={isSubbed}
          />
        </Form.Group>
      </Form>
    </Col>
  );
};

export default NotificationsCheckbox;
