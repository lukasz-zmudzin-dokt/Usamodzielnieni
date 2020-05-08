import React from "react";
import { ListGroup, OverlayTrigger, Tooltip } from "react-bootstrap";

const MessageItem = ({ content, send, side }) => {
  const variant = side === "left" ? "primary" : "info";
  const placement = side === "left" ? "bottom-start" : "bottom-end";
  return (
    <OverlayTrigger
      key={"bottom"}
      placement={placement}
      overlay={
        <Tooltip id={`tooltip-bottom`}>
          <small>Wysłano: {send}</small>
        </Tooltip>
      }
    >
      <ListGroup.Item
        className={`messagesList__item messagesList__item--${side}`}
        variant={variant}
      >
        {content}
      </ListGroup.Item>
    </OverlayTrigger>
  );
};

export default MessageItem;
