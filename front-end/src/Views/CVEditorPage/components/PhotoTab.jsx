import React from "react";
import { Form, Col } from "react-bootstrap";
import { CVEditorTab } from ".";
import movie_1 from "assets/movie_1.png";

class PhotoTab extends React.Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
  }

  onChange = e => {
    this.props.onChange(this.fileInput.files[0]);
    console.log(this.fileInput.files[0]);
  };

  render() {
    return (
      <CVEditorTab
        title="Zdjęcie"
        movie={movie_1}
        onPrevClick={this.props.onPrevClick}
        disabled={this.props.disabled}
      >
        <Form.Group as={Col} controlId="photo">
          <Form.Label>Wybierz zdjęcie:</Form.Label>
          <Form.Control
            name="photo"
            type="file"
            ref={ref => (this.fileInput = ref)}
            onChange={this.onChange}
            accept="image/*"
          />
        </Form.Group>
      </CVEditorTab>
    );
  }
}

export default PhotoTab;
