import React from "react";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {Editor, createEditorState} from 'medium-draft';
import {getFilters} from "./functions/apiCalls";
import "medium-draft/lib/index.css";
import {customizeToolbar} from "./functions/editorConfig";
import SelectionRow from "./components/SelectionRow";
import {UserContext} from "../../context/UserContext";

class BlogPostForm extends React.Component {
  constructor(props) {
      super(props);
      this.fileInput = React.createRef();
      this.state = {
          photo: null,
          editorState: createEditorState(),
          title: undefined,
          category: "",
          tags: [],
          filters: {
              categories: [],
              tags: []
          }
      };
      this.refsEditor = React.createRef();
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
      this.loadFilters().then( res => {
          this.setState({
              filters: res
          });
      });
  }

  loadFilters = async () => {
      let res;
      try {
          res = await getFilters(this.context.token);
      } catch(e) {
          console.log(e);
          res = {categories: [], tags: []}
      }
      return res;
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

  onEditorChange = (editorState) => {
    this.setState({
        editorState
    });
    this.refsEditor = React.createRef();
  };

  onArrayChange = e => {
      const tagList = this.state.tags;
      this.setState({
          tags: [...tagList, e.target.value]
      });
  };

  cutFromArray = e => {
      const source = e.target.name;
      const tagList = this.state.tags;
      const index = tagList.indexOf(source);
      if (index !== -1) tagList.splice(index, 1);
      this.setState({
          tags: tagList
      });
  };

  render () {
      const config = customizeToolbar();
      console.log(this.state);
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
                      <Form.Group controlId="blogpost_title" className="mx-3 mb-4">
                          <Form.Control
                              name="title"
                              className="blogpost_title_form block"
                              placeholder="Wpisz tytuł posta..."
                              size="lg"
                              onChange={this.onChange}
                          />
                      </Form.Group>
                      {console.log(this.state.filters.categories)}
                      <SelectionRow name="category" arrayType={[this.state.filters.categories]} onChange={this.onChange} />
                      <div className="my-4">
                          <Editor
                              placeholder="Napisz swoją historię..."
                              ref={this.refsEditor}
                              editorState={this.state.editorState}
                              onChange={this.onEditorChange}
                              inlineButtons={config.inline}
                              blockButtons={config.block}
                              sideButtons={[]}
                          />
                      </div>
                      <SelectionRow className="mt-4" name="tags" arrayType={[this.state.filters.tags]} onChange={this.onArrayChange} current={this.state.tags} onCut={this.cutFromArray}/>
                  </Card.Body>
                  <Card.Footer className="">
                      <Button variant="primary" size="lg" block>Opublikuj</Button>
                  </Card.Footer>
              </Card>
          </Container>
      );
  }
}

BlogPostForm.contextType = UserContext;

export default BlogPostForm;