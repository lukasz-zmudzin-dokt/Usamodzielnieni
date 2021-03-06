import React from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { Items } from "../";
import { withAlertContext } from "components";

class ItemsList extends React.Component {
  constructor(props) {
    super(props);
    if (this.props.data === null) {
      this.props.onChange([]);
    }
  }

  addItem = (e) => {
    e.preventDefault();
    if (!e.currentTarget.checkValidity()) {
      this.props.setSmallFormValidated(true);
      e.stopPropagation();
    } else {
      this.props.setSmallFormValidated(false);
      const { data, getItemId, getItem } = this.props;
      const item = getItem();

      if (data.find((dt) => getItemId(dt) === getItemId(item))) {
        this.props.alertContext.showAlert(
          "Taka sama pozycja znajduje się już na liście."
        );
      } else {
        this.props.onChange([...this.props.data, item]);
        this.props.clear();
      }
    }
  };

  cutItem = (i) => {
    this.props.onChange(this.props.data.filter((_, index) => index !== i));
  };

  render() {
    const { data, getItemId, getItemName, children } = this.props;

    if (data === null) return null;

    const msg = this.props.required && this.props.validated && !data.length && (
      <Alert variant="danger">Lista nie może być pusta.</Alert>
    );

    return (
      <Form
        onSubmit={this.addItem}
        noValidate
        validated={this.props.smallFormValidated}
      >
        {data.length > 0 && (
          <Form.Group controlId="items">
            <Items
              items={data}
              onCutClick={this.cutItem}
              getItemId={getItemId}
              getItemName={getItemName}
            />
          </Form.Group>
        )}
        {msg}
        {children}
        <Button type="submit" className="mb-3" variant="success">
          + Dodaj
        </Button>
      </Form>
    );
  }
}

export default withAlertContext(ItemsList);
