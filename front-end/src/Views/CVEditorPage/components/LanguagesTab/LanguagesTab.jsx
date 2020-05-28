import React from "react";
import { Form, Row, Col } from "react-bootstrap";
import movie_5 from "assets/movie_5.png";
import { CVEditorTab, ItemsList } from "..";

class LanguagesTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      smallFormValidated: false,
      newLanguage: {
        name: "",
        level: "A1",
      },
    };
  }

  getLanguage = () => this.state.newLanguage;
  getLanguageId = (lang) => `${lang.name}_${lang.level}`;
  getLanguageName = (lang) => `${lang.name} - ${lang.level}`;
  clear = () => this.setState({ newLanguage: { name: "", level: "A1" } });

  handleNameChange = (e) => {
    const name = e.target.value;

    this.setState((prevState) => ({
      newLanguage: { ...prevState.newLanguage, name },
    }));
  };

  handleLevelChange = async (e) => {
    const level = await e.target.value;

    this.setState((prevState) => ({
      newLanguage: { ...prevState.newLanguage, level },
    }));
  };
  setSmallFormValidated = (value) =>
    this.setState({ smallFormValidated: value });

  render() {
    const levels = [
      { value: "A1", text: "A1 – początkujący" },
      { value: "A2", text: "A2 – podstawowy" },
      { value: "B1", text: "B1 – niższy średniozaawansowany" },
      { value: "B2", text: "B2 – wyższy średniozaawansowany" },
      { value: "C1", text: "C1 – zaawansowany" },
      { value: "C2", text: "C2 – biegły" },
    ];
    return (
      <CVEditorTab
        title="Języki obce"
        movie={movie_5}
        video={this.props.video}
        errVid={this.props.errVid}
        onPrevClick={this.props.onPrevClick}
        onNextClick={this.props.onNextClick}
        comments={this.props.comments}
        loading={this.props.loading}
        error={this.props.error}
        showComments={this.props.showComments}
        formTab={this.props.formTab}
      >
        <ItemsList
          getItemId={this.getLanguageId}
          getItemName={this.getLanguageName}
          getItem={this.getLanguage}
          data={this.props.data}
          onChange={this.props.onChange}
          clear={this.clear}
          validated={this.props.validated}
          required
          smallFormValidated={this.state.smallFormValidated}
          setSmallFormValidated={this.setSmallFormValidated}
        >
          <Row>
            <Form.Group as={Col} xs={12} md={6} controlId="languageName">
              <Form.Label>Język:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Język"
                value={this.state.newLanguage.name}
                onChange={this.handleNameChange}
                required
                minLength="1"
                maxLength="20"
              />
              <Form.Control.Feedback type="invalid">
                Nazwa języka jest wymagana.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} xs={12} md={6} controlId="languageLevel">
              <Form.Label>Poziom:</Form.Label>
              <Form.Control
                as="select"
                onChange={this.handleLevelChange}
                value={this.state.newLanguage.level}
                required
              >
                {levels.map((lev) => (
                  <option key={lev.value} value={lev.value}>
                    {lev.text}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Row>
        </ItemsList>
      </CVEditorTab>
    );
  }
}

export default LanguagesTab;
