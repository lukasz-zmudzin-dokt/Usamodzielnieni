import React from "react";
import {ListGroup,Container} from 'react-bootstrap'

const MessagesList = () => {
  return (
    <Container>
      <ListGroup>
        <ListGroup.Item
          className="messagesList__item messagesList__item--left"
          variant="primary"
        >
          Info długa wiadomość bardzo jakaś dzień dobry i te sprawy co tam jak
          tam jeszcze trochę żeby się zawinęło albo jeszcze trochę
          <small class="text-muted">Wysłano: 11:55 12.03.2020</small>
        </ListGroup.Item>
        <ListGroup.Item
          className="messagesList__item messagesList__item--right"
          variant="info"
        >
          Tutaj te długa wiadomość ale nie az tak dluga jak tamta wyzej no
          jeszcze troszkę albo i tak długa
          <small class="text-muted">Wysłano: 12:55 12.03.2020</small>
        </ListGroup.Item>
        <ListGroup.Item
          className="messagesList__item messagesList__item--right"
          variant="info"
        >
          a<small class="text-muted">Wysłano: 12:56 12.03.2020</small>
        </ListGroup.Item>
        <ListGroup.Item
          className="messagesList__item messagesList__item--left"
          variant="primary"
        >
          b<small class="text-muted">Wysłano: 11:55 12.03.2020</small>
        </ListGroup.Item>
      </ListGroup>
    </Container>
  );
};

export default MessagesList;
