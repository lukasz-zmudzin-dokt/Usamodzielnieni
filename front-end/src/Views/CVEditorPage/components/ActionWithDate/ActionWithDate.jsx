import React from "react";
import { Form, Row, Col } from "react-bootstrap";
import { ItemsList } from "../";
import DatePicker, { registerLocale } from "react-datepicker";
import polish from "date-fns/locale/pl";

registerLocale("pl", polish);

class ActionWithDate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newAction: {
        startTime: undefined,
        endTime: undefined,
        place: "",
        description: "",
      },
    };
  }

  getAction = () => this.state.newAction;
  getActionId = (action) => `${action.place}_${action.description}`;
  getActionName = (action) => {
    const dateToString = (date, label) => {
      if (date) {
        const month = date.getMonth() + 1;
        const year = date.getYear() + 1900;
        return `${label}: ${month < 10 ? "0" : ""}${month}/${year}`;
      }
      return "";
    };

    return `${action.place} ${dateToString(
      action.startTime,
      "od"
    )} ${dateToString(action.endTime, "do")} ${
      action.description ? `(${action.description})` : ""
    }`;
  };
  onChange = (e, key) => {
    const { value } = e.target;
    this.setState((prevState) => ({
      newAction: { ...prevState.newAction, [key]: value },
    }));
  };
  clear = () => {
    this.setState({
      newAction: {
        startTime: undefined,
        endTime: undefined,
        place: "",
        description: "",
      },
    });
  };

  render() {
    return (
      <ItemsList
        getItemId={this.getActionId}
        getItemName={this.getActionName}
        getItem={this.getAction}
        data={this.props.data}
        onChange={this.props.onChange}
        clear={this.clear}
        validated={this.props.validated}
        required={this.props.required}
      >
        <Row>
          <Form.Group as={Col} xs={12} md={6}>
            <Form.Label htmlFor="startTime">Od:</Form.Label>
            <DatePicker
              id="startTime"
              className="form-control"
              locale="pl"
              dateFormat="MM.yyyy"
              placeholderText="Data rozpoczęcia"
              selected={this.state.newAction.startTime}
              onChange={(startTime) =>
                this.setState((prevState) => ({
                  newAction: { ...prevState.newAction, startTime },
                }))
              }
              showMonthYearPicker
              maxDate={this.state.newAction.endTime}
            />
          </Form.Group>
          <Form.Group as={Col} xs={12} md={6}>
            <Form.Label htmlFor="endTime">Do:</Form.Label>
            <DatePicker
              id="endTime"
              className="form-control"
              locale="pl"
              dateFormat="MM.yyyy"
              placeholderText="Data zakończenia"
              selected={this.state.newAction.endTime}
              onChange={(endTime) =>
                this.setState((prevState) => ({
                  newAction: { ...prevState.newAction, endTime },
                }))
              }
              showMonthYearPicker
              minDate={this.state.newAction.startTime}
            />
          </Form.Group>
        </Row>
        <Form.Group controlId="actionPlace">
          <Form.Label>Miejsce:</Form.Label>
          <Form.Control
            {...this.props.place}
            type="text"
            placeholder="Nazwa szkoły/miejsca pracy"
            value={this.state.newAction.place}
            onChange={(e) => this.onChange(e, "place")}
          />
          <Form.Control.Feedback type="invalid">
            Miejsce jest wymagane.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="actionDescription">
          <Form.Label>Opis:</Form.Label>
          <Form.Control
            {...this.props.description}
            type="text"
            placeholder="Profil/stanowisko ..."
            value={this.state.newAction.description}
            onChange={(e) => this.onChange(e, "description")}
          />
          <Form.Control.Feedback type="invalid">
            Opis jest wymagany.
          </Form.Control.Feedback>
        </Form.Group>
      </ItemsList>
    );
  }
}

export default ActionWithDate;
