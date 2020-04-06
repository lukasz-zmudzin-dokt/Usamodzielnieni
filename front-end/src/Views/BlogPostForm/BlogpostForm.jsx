import React from "react";
import {Card, Col, Container, Form, Row} from "react-bootstrap";
import {Editor, createEditorState} from 'medium-draft';
import {getFilters} from "./functions/fetchData";
import {FormRow} from "react-bootstrap/Form";

class BlogPostForm extends React.Component {
  constructor(props) {
      super(props);
      this.fileInput = React.createRef();
      this.state = {
          photo: null,
          editorState: null,
          title: undefined,
          category: "",
          filters: {}
      }
  }

  componentDidMount() {
      if (this.props.data !== undefined) {
          this.setState({
              editorState: createEditorState(this.props.data.content)
          });
      } else {
          this.setState({
              editorState: createEditorState()
          });
      }
      this.loadFilters();
  }

  loadFilters = async () => {
      let res;
      try {
          res = await getFilters(this.context.token);
      } catch(e) {
          console.log(e);
          res = {categories: [], tags: []}
      }
      this.setState({
          filters: res
      })
  };

    onPhotoChange = () => {
      this.setState({
          photo: this.fileInput.files[0]
      })
  };

  onChange = e => {
      this.setState({
          [e.target.name]: e.target.value
      })
  };

  render () {
      return (
          <Container>
              <Card>
                  <Card.Header>
                      <Form.Group controlId="blogpost_photo">
                          <Form.File
                              name="photo"
                              id="blogspot_header_photo"
                              label={this.state.photo !== null ? this.state.photo.name : "Wybierz zdjęcie na nagłówek posta"}
                              custom
                              ref={(ref) => this.fileInput = ref}
                              onChange={this.onPhotoChange}
                              accept="image/*"
                              data-browse="Dodaj"
                          />
                      </Form.Group>
                  </Card.Header>
                  <Card.Body>
                      <Form.Group controlId="blogpost_title">
                          <Form.Control
                            name="title"
                            className="blogpost_title_form"
                            placeholder="Wpisz tytuł posta..."
                            size="lg"
                            onChange={this.onChange}
                          />
                      </Form.Group>
                      <Form.Row className="categories mx-1 inline">
                          <Form.Group controlId="blogspot_category">
                              <Form.Control
                                as="select"
                                name="category"
                                placeholder="Wybierz kategorię z listy..."
                                array={this.state.filters.categories}
                                onSelect={this.onChange}
                              />
                              <div className="mx-2">lub</div>
                              <Form.Control
                                name="category"
                                placeholder="Wpisz nową kategorię"
                              />
                          </Form.Group>


                      </Form.Row>
                  </Card.Body>
              </Card>
          </Container>
      )
  }
};

export default BlogPostForm;