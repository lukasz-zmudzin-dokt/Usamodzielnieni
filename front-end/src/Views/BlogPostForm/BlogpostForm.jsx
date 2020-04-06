import React from "react";
import {Card, Container, Form} from "react-bootstrap";

class BlogPostForm extends React.Component {
  constructor(props) {
      super(props);
      this.fileInput = React.createRef();
      this.state = {
          photo: null
      }
  }

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

                  </Card.Body>
              </Card>
          </Container>
      )
  }
};

export default BlogPostForm;