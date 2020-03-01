import React from "react";
import { Form, Col } from "react-bootstrap";

class FileInput extends React.Component {
    constructor(props) {
      super(props);
      this.fileInput = React.createRef();
    }
  
    render() {
      return (
        <Form.Group as={Col} controlId="">
            <Form.Label>
                Wybierz zdjęcie:
            </Form.Label>
            <Form.Control
                name="photo"
                inline
                type="file"
                ref={this.fileInput}
            />
        </Form.Group>
      );
    }
  }

  export default FileInput;