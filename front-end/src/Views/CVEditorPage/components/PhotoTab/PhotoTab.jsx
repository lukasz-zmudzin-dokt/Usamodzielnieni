import React from "react";
import { Form, Row } from "react-bootstrap";
import { CVEditorTab } from "..";
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
        comments={this.props.comments}
        loading={this.props.loading}
        error={this.props.error}
        showComments={this.props.showComments}
        disabled={this.props.disabled}
      >
        <Form.Group controlId="photo">
          <Form.File
            id="custom-file"
            label={this.props.data ? this.props.data.name : "Wybierz zdjęcie"}
            custom
            ref={ref => (this.fileInput = ref)}
            onChange={this.onChange}
            accept="image/*"
            data-browse="Dodaj"
            // value="this.props.data"
          />
        </Form.Group>
      </CVEditorTab>
    );
  }
}

export default PhotoTab;
