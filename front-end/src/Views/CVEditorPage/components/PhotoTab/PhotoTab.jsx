import React from "react";
import { Form } from "react-bootstrap";
import { CVEditorTab } from "..";
import movie_1 from "assets/movie_1.png";
import proxy from "config/api";

class PhotoTab extends React.Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
  }

  onChange = (e) => {
    this.props.onChange(this.fileInput.files[0]);
  };

  setLabel = () => {
    const label =
      this.props.data !== null
        ? this.props.data.name
        : this.props.hasPhoto
        ? "Poprzednie zdjęcie"
        : "Wybierz zdjęcie";
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
              ref={(ref) => (this.fileInput = ref)}
              onChange={this.onChange}
              accept="image/*"
              data-browse="Dodaj"
              // value="this.props.data"
            />
          </Form.Group>
          {
            this.props.templateList.length > 0 && (
                <Form.Group>
                  <Form.Label>Kolor CV: (<a target="_blank" href={proxy.plain + "/static/" + this.props.template + ".pdf"}>Kliknij <u>tutaj</u> żeby zobaczyć przykładowe CV w tym kolorze</a>)</Form.Label>
                  <Form.Control
                      as="select"
                      id="template"
                      value={this.props.template}
                      onChange={e => this.props.setTemplate(e.target.value)}
                  >
                    {this.props.templateList.map(item => (
                        <option key={item} value={item} style={{backgroundColor: item}}>{item}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
            )
          }
        </Form>
      </CVEditorTab>
    );
  }
}

export default PhotoTab;
