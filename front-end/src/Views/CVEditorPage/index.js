import React from "react";
import {Button, ButtonToolbar, Card, Container, Form, Tab, Tabs} from "react-bootstrap";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import polish from "date-fns/locale/pl";
import bgImage from "../../assets/fot..png";
import "./style.css";
import movie_1 from "../graphics/movie_1.png";
import movie_2 from "../graphics/movie_2.png";
import movie_3 from "../graphics/movie_3.png";
import movie_4 from "../graphics/movie_4.png";
import movie_5 from "../graphics/movie_5.png";
import Col from "react-bootstrap/Col";
import Languages from 'Views/CVEditorPage/components/Languages';
import Skills from 'Views/CVEditorPage/components/Skills';
import RenderForm from 'Views/CVEditorPage/components/RenderForm';
import {connect} from 'react-redux'

import {handleBlur,handleCVSubmit,handleBirthDateChange,handleAddLanguage,handleLanChange,handleLanLvlChange,handleSkillAdd} from 'Views/CVEditorPage/functions/handlers.js';


registerLocale("pl", polish);

class CVEditorPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: "",
            birthDate: new Date(),
            phoneNumber: "",
            email: "",

            education: {},
            eduPlace: "",
            eduDescription: "",
            eduStartTime: new Date(),
            eduEndTime: undefined,

            workExperience: {},
            workPlace: "",
            workDescription: "",
            workStartTime: new Date(),
            workEndTime: undefined,

            skills: [],
            skillToAdd: "",

            languages: {},
            languageName: "",
            languageLevel: "podstawowy",

            formTab: "personalData",
            token: this.props.token || undefined
        };
    }
    render() {
        return (
            <Container className="CVEditorPage">
                {window.innerWidth >= 768 ? (
                    <img className="cvPage__bgImage" src={bgImage} alt="tło" />
                ) : null}
                <Card className="CVEditorPage_card">
                    <Card.Header className="cv_page_title" as="h2">
                        Kreator CV
                    </Card.Header>
                    <Card.Body>
                        <Form id="cv_data" onSubmit={e => handleCVSubmit(this,e)}>
                            <Col>
                                <Tabs
                                    activeKey={this.state.formTab}
                                    onSelect={e => this.setState({ formTab: e })}
                                    id="tabs"
                                >
                                    <Tab eventKey="personalData" title="Dane osobowe">
                                        <Form.Label>
                                            <h3>Dane osobowe</h3>
                                            <br></br>
                                            <img className="cv_section_img" src={movie_1} width="400vw" alt="" />
                                        </Form.Label>
                                        <Form.Group controlId="personalData">
                                            <Form.Label column={""} sm="2">
                                                Imię i nazwisko:
                                            </Form.Label>
                                            <Form.Control
                                                inline
                                                type="text"
                                                required
                                                defaultValue={this.state.fullName}
                                                placeholder="Jan Przykładowy"
                                                onBlur={e => handleBlur(this,e, "fullName")}
                                                className="cv_page_input"
                                            />
                                            <Form.Label column={""} sm="2">
                                                Data urodzenia:{" "}
                                            </Form.Label>
                                            <DatePicker
                                                className="cv_page_input"
                                                locale="pl"
                                                dateFormat=" dd.MM.yyyy"
                                                selected={this.state.birthDate}
                                                onChange={() => handleBirthDateChange(this)}
                                                withPortal
                                                peekNextMonth
                                                showMonthDropdown
                                                showYearDropdown
                                                dropdownMode="select"
                                            />
                                            <Form.Label column={""} sm="2">
                                                Numer telefonu:
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                defaultValue={this.state.phoneNumber}
                                                placeholder="+48123456789"
                                                onBlur={e => handleBlur(this,e, "phoneNumber")}
                                                className="cv_page_input"
                                            />
                                            <Form.Label column={""} sm="2">
                                                Adres email:
                                            </Form.Label>
                                            <Form.Control
                                                type="email"
                                                required
                                                defaultValue={this.state.email}
                                                placeholder="example@domain.com"
                                                onBlur={e => handleBlur(this,e, "email")}
                                                className="cv_page_input"
                                            />
                                        </Form.Group>
                                        <ButtonToolbar>
                                            <Button className="form_navigation_prev" disabled>← Wstecz</Button>
                                            <Button
                                                className="form_navigation_next"
                                                onClick={e => this.setState({ formTab: "education" })}
                                            >
                                                Dalej →
                                            </Button>
                                        </ButtonToolbar>
                                    </Tab>
                                    <Tab eventKey="education" title="Edukacja">
                                        <Form.Group id="complex-cv-fields">
                                            <Form.Label>
                                                <h3>Edukacja</h3>
                                                <br></br>
                                                <img className="cv_section_img" src={movie_2} width="400vw" alt="" />
                                            </Form.Label>
                                            <RenderForm component={this} formName="education"/>
                                        </Form.Group>
                                        <ButtonToolbar>
                                            <Button
                                                className="form_navigation_prev"
                                                onClick={e =>
                                                    this.setState({ formTab: "personalData" })
                                                }
                                            >
                                                ← Wstecz
                                            </Button>
                                            <Button
                                                className="form_navigation_next"
                                                onClick={e =>
                                                    this.setState({ formTab: "workExperience" })
                                                }
                                            >
                                                Dalej →
                                            </Button>
                                        </ButtonToolbar>
                                    </Tab>
                                    <Tab eventKey="workExperience" title="Doświadczenie zawodowe">
                                        <Form.Group id="complex-cv-fields">
                                            <Form.Label>
                                                <h3>Doświadczenie zawodowe</h3>
                                                <br></br>
                                                <img className="cv_section_img" src={movie_3} width="400vw" alt="" />
                                            </Form.Label>
                                            <RenderForm component={this} formName="workExperience" />
                                        </Form.Group>
                                        <ButtonToolbar>
                                            <Button
                                                className="form_navigation_prev"
                                                onClick={e => this.setState({ formTab: "education" })}
                                            >
                                                ← Wstecz
                                            </Button>
                                            <Button
                                                className="form_navigation_next"
                                                onClick={e => this.setState({ formTab: "skills" })}
                                            >
                                                Dalej →
                                            </Button>
                                        </ButtonToolbar>
                                    </Tab>
                                    <Tab eventKey="skills" title="Umiejętności">
                                        <Form.Group id="complex-cv-fields">
                                            <Form.Label>
                                                <h3>Umiejętności</h3>
                                                <br></br>
                                                <img className="cv_section_img" src={movie_4} width="400vw" alt="" />
                                            </Form.Label>
                                            <Skills component={this} />
                                            <Form.Control
                                                className="cv_page_input"
                                                type="text"
                                                placeholder="Wpisz umiejętność"
                                                value={this.state.skillToAdd}
                                                onChange={e => {
                                                    this.setState({ skillToAdd: e.target.value });
                                                }}
                                            />
                                            <Button
                                                variant="success"
                                                onClick={e => {
                                                    handleSkillAdd(this,e);
                                                    console.log(this.state.skills);
                                                }}
                                            >
                                                + Dodaj
                                            </Button>
                                        </Form.Group>
                                        <ButtonToolbar>
                                            <Button
                                                className="form_navigation_prev"
                                                onClick={e =>
                                                    this.setState({ formTab: "workExperience" })
                                                }
                                            >
                                                ← Wstecz
                                            </Button>
                                            <Button
                                                className="form_navigation_next"
                                                onClick={e => this.setState({ formTab: "languages" })}
                                            >
                                                Dalej →
                                            </Button>
                                        </ButtonToolbar>
                                    </Tab>
                                    <Tab eventKey="languages" title="Języki obce">
                                        <Form.Group id="complex-cv-fields">
                                            <Form.Label>
                                                <h3>Języki obce</h3>
                                                <br></br>
                                                <img className="cv_section_img" src={movie_5} width="400vw" alt="" />
                                            </Form.Label>
                                            <Languages component={this}/>
                                            <Form.Control
                                                className="cv_page_input"
                                                id="languages"
                                                type="text"
                                                placeholder="Język"
                                                value={this.state.languageName}
                                                onChange={e =>handleLanChange(this,e)}
                                            />
                                            <Form.Group controlId="exampleForm.ControlSelect1">
                                                <Form.Label>Poziom</Form.Label>
                                                <Form.Control
                                                    className="cv_lang_lvl_selector"
                                                    as="Select"
                                                    onChange={e => handleLanLvlChange(this,e)}
                                                    //    value={this.state.languageLevel}
                                                >
                                                    <option value="podstawowy">podstawowy</option>
                                                    <option value="komunikatywny">komunikatywny</option>
                                                    <option value="biegły">biegły</option>
                                                </Form.Control>
                                                <Button
                                                    variant="success"
                                                    onClick={language => handleAddLanguage(this,language)}
                                                >
                                                    + Dodaj
                                                </Button>
                                            </Form.Group>
                                            <ButtonToolbar>
                                                <Button
                                                    className="form_navigation_prev"
                                                    onClick={e => this.setState({ formTab: "skills" })}
                                                >
                                                    ← Wstecz
                                                </Button>
                                                <Button className="form_navigation_next" disabled>Dalej →</Button>
                                            </ButtonToolbar>

                                            <ButtonToolbar id="cv_mgmt_button_toolbar">
                                                <Button
                                                    className="btn_discard"
                                                    size="lg"
                                                    variant="danger"
                                                    type="reset"
                                                    id="discardButton"
                                                    href="/user"
                                                >
                                                    Odrzuć
                                                </Button>
                                                <Button
                                                    className="btn_generate"
                                                    size="lg"
                                                    variant="success"
                                                    type="submit"
                                                    id="saveButton"
                                                >
                                                    Generuj CV
                                                </Button>
                                            </ButtonToolbar>
                                        </Form.Group>
                                    </Tab>
                                </Tabs>
                            </Col>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    console.log("mapStateToProps:", state);
    const { token } = state.user;
    return { token };
};

export default connect(mapStateToProps)(CVEditorPage);