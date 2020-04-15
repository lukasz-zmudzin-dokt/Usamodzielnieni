import React from "react";
import { Form } from "react-bootstrap";
import { CVEditorTab } from "..";
import movie_1 from "assets/movie_1.png";

class PhotoTab extends React.Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
  }

  onChange = e => {
    this.props.onChange(this.fileInput.files[0]);
  };

  render() {
    return (
      <CVEditorTab
        title="Zdjęcie"
        movie={movie_1}
        onPrevClick={this.props.onPrevClick}
        onSubmit={this.props.onSubmit}
        comments={this.props.comments}
        loading={this.props.loading}
        error={this.props.error}
        showComments={this.props.showComments}
        disabled={this.props.disabled}
      >
        <Form>
          <Form.Group>
            <Form.Label htmlFor="custom-file">Zdjęcie:</Form.Label>
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
        </Form>
      </CVEditorTab>
    );
  }
}

export default PhotoTab;
