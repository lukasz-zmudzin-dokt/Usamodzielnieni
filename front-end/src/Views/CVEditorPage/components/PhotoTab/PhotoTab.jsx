import React from "react";
import { Form } from "react-bootstrap";
import { CVEditorTab } from "..";
import movie_1 from "assets/movie_1.png";

class PhotoTab extends React.Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
  }

  onChange = (e) => {
    this.props.onChange(this.fileInput.files[0]);
  };

  setLabel = () => {
    const label = this.props.data !== null ? this.props.data.name :
        this.props.hasPhoto ? "Poprzednie zdjęcie" : "Wybierz zdjęcie";
    return label;
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
        isNew={this.props.isNew}
      >
        <Form>
          <Form.Group>
            <Form.Label htmlFor="custom-file">Zdjęcie:</Form.Label>
            <Form.File
              id="custom-file"
              custom
              label={this.setLabel()}
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
