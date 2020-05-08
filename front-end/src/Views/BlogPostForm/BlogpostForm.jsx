import React from "react";
import {Alert, Button, Card, Container, Form} from "react-bootstrap";
import {Editor, createEditorState} from 'medium-draft';
import {getFilters, getPost, postBlogPost, uploadPhoto} from "./functions/apiCalls";
import "medium-draft/lib/index.css";
import {customizeToolbar} from "./functions/editorConfig";
import SelectionRow from "./components/SelectionRow";
import {UserContext} from "context";
import mediumDraftExporter from "medium-draft/lib/exporter";
import mediumDraftImporter from 'medium-draft/lib/importer';
import {convertToRaw} from 'draft-js';
import {Redirect} from "react-router-dom";
import {withAlertContext} from 'components';

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
          },
          redirect: false,
          post_id: -1,
          method: "POST",
          isLoading: false
      };
      this.refsEditor = React.createRef();
  }

  componentDidMount() {
      if (window.location.pathname.toLowerCase() !== "/blog/newpost") {
          this.setState({
              method: "PUT"
          });
          const post_Id = window.location.pathname.replace(/\/blog\/newpost\//i, '');
          this.loadPost(post_Id).then(res => {
              if (res === null) {
                  this.setState({error: "get"});
              } else {
                  this.setState({
                      post_id: post_Id,
                      photo: res.photo || null,
                      tags: res.tags,
                      title: res.title,
                      category: res.category,
                      editorState: createEditorState(convertToRaw(mediumDraftImporter(res.content)))
                  });
              }
          });
      }
      this.loadFilters().then( res => {
          this.setState({
              filters: res
          });
      });
  }

  loadPost = async (id) => {
      let res;
      try {
          res = await getPost(id, this.context.token);
      } catch(e) {
          console.log(e);
          res = null;
           this.props.alertContext.showAlert(
             "Wystąpił błąd podczas pobierania treści posta."
           );
      }
      return res;
  };

  loadFilters = async () => {
      let res;
      try {
          res = await getFilters(this.context.token);
      } catch(e) {
          console.log(e);
          res = {categories: [], tags: []}
          this.props.alertContext.showAlert(
              "Nie udało się załadować tagów i kategorii."
          );
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

  setRedirect = () => {
      this.setState({
          redirect: true
      });
  };

  submitPost = async (e) => {
      e.preventDefault();
      const data = {
          category: this.state.category,
          tags: this.state.tags,
          title: this.state.title,
          content: mediumDraftExporter(this.state.editorState.getCurrentContent())
      };
      try {
          const res = await postBlogPost(data, this.context.token, this.state.method, this.state.post_id);
          this.setState({
              post_id: res.id
          });
          if (this.state.photo !== null) {
              try {
                  await uploadPhoto(this.state.post_id, this.state.photo, this.context.token);
              } catch(e) {
                  console.log(e);
                  this.props.alertContext.showAlert(
                    "Wystąpił błąd podczas dodawania zdjęcia."
                  );
              }
          }
          this.setRedirect();
      } catch(e) {
          console.log(e);
           this.props.alertContext.showAlert(
             "Wystąpił błąd podczas dodawania posta."
           );
      }
  };

  render () {
      const config = customizeToolbar();
      return (
          <Container>
              <Card>
                  <Card.Header>
                      {this.state.isLoading ?
                        <Alert variant="info">Ładowanie edytora postów.</Alert> : null
                      }
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
                              defaultValue={this.state.title}
                              placeholder="Wpisz tytuł posta..."
                              size="lg"
                              onChange={this.onChange}
                          />
                      </Form.Group>
                      <SelectionRow name="category" arrayType={this.state.filters.categories} current={this.state.category} onChange={this.onChange} />
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
                      <SelectionRow className="mt-4" name="tags" arrayType={this.state.filters.tags} onChange={this.onArrayChange} current={this.state.tags} onCut={this.cutFromArray}/>
                  </Card.Body>
                  <Card.Footer className="">
                      <Button variant="primary" size="lg" onClick={this.submitPost} block>Opublikuj</Button>
                  </Card.Footer>
              </Card>
              {this.state.redirect ? <Redirect to={`/blog/blogpost/${this.state.post_id}`}/> : null}
          </Container>
      );
  }
}

BlogPostForm.contextType = UserContext;

export default withAlertContext(BlogPostForm);