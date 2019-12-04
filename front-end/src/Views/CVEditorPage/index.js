import React from "react";
import { Container, Button, Card, Form, ButtonToolbar } from "react-bootstrap";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import polish from "date-fns/locale/pl";
import bgImage from "../../assets/fot..png";
import "./style.css";
import Col from "react-bootstrap/Col";

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
            eduDescription: "",
            eduStartTime: new Date(),
            eduEndTime: null,

            workExperience: {},
            workDescription: "",
            workStartTime: new Date(),
            workEndTime: null,

            skills: [],
            skillToAdd: "",

            languages: {},
            languageName: "",
            languageLevel: "podstawowy"
        };
    }

    addComplexItem = (e, arrayName) => {
        e.preventDefault();
        let array =
            arrayName === "education"
                ? this.state.education
                : this.state.workExperience;
        let itemDescription =
            arrayName === "education"
                ? this.state.eduDescription
                : this.state.workDescription;
        let itemStartTime =
            arrayName === "education"
                ? this.state.eduStartTime
                : this.state.workStartTime;
        let itemEndTime =
            arrayName === "education"
                ? this.state.eduEndTime
                : this.state.workEndTime;

        let descrStr =
            arrayName === "education" ? "eduDescription" : "workDescription";
        let startStr = arrayName === "education" ? "eduStartTime" : "workStartTime";
        let endStr = arrayName === "education" ? "eduEndTime" : "workEndTime";

        let newItemList = array;
        let newItemDates = [itemStartTime, itemEndTime];

        if (itemDescription !== "") {
            newItemList[itemDescription] = newItemDates;
        }
        this.setState({
            [arrayName]: newItemList,
            [descrStr]: "",
            [startStr]: new Date(),
            [endStr]: null
        });

        for (let prop in this.state.education) {
            console.log(this.complexItemToStr(prop, this.state.education[prop]));
        }

        console.log(this.state.workExperience);
    };

    handleDateChange = (dateFieldName, date) => {
        this.setState({
            [dateFieldName]: date
        });
    };

    handleBlur = (e, val) => {
        this.setState({
            [val]: e.target.value
        });
    };

    handleCVSubmit = e => {
        console.log(this.state);
        e.preventDefault();
    };

    handleSubmit = (e, language) => {
        console.log(language.state);
        e.preventDefault();
    };

    handleBirthDateChange = date => {
        this.setState({
            birthDate: date
        });
    };

    handleAddLanguage = e => {
        let newLanguages = this.state.languages;
        let name = this.state.languageName;
        let level = this.state.languageLevel;

        let correctName = name !== "";

        if (correctName) {
            newLanguages[name] = level;
            this.setState({
                languages: newLanguages
            });

            this.setState({
                languageName: ""
            });
        }

        console.log(this.state.languages);
    };

    handleLanChange = e => {
        this.setState({
            languageName: e.target.value
        });
    };

    handleLanLvlChange = async e => {
        var value = await e.target.value;

        this.setState({ languageLevel: value });
    };

    handleSkillAdd = e => {
        let newSkills = this.state.skills;
        let name = this.state.skillToAdd;
        let correctName = name !== "";

        if (
            correctName &&
            this.state.skills.indexOf(this.state.skillToAdd) === -1
        ) {
            newSkills.push(name);

            this.setState({
                skills: newSkills
            });

            this.setState({
                skillToAdd: ""
            });
        }
    };

    handleCutSkill = e => {
        let items = this.state.skills;
        let index = this.state.skills.indexOf(e.target.id);

        if (index !== -1) {
            items.splice(index, 1);
            this.setState({
                skills: items
            });
        }
    };

    handleCutLanguage = e => {
        let newLanguages = this.state.languages;
        let toDelete = e.target.id;

        delete newLanguages[toDelete];

        this.setState({
            languages: newLanguages
        });
    };

    handleCutEdu = e => {
        let newEducation = this.state.education;
        let toDelete = e.target.id;

        delete newEducation[toDelete];

        this.setState({
            education: newEducation
        });
    }

    handleCutWork = e => {
        let newEducation = this.state.workExperience;
        let toDelete = e.target.id;

        delete newEducation[toDelete];

        this.setState({
            workExperience: newEducation
        });
    }

    complexItemToStr(key, dates) {
        //console.log(key);
        //console.log(dates);
        let toReturn = "" + key;
        let start = dates[0];
        let end = dates[1];
        let month = start.getMonth() + 1;
        let year = start.getYear() + 1900;

        toReturn += "\nod: " + month + "/" + year;

        if (end === null) {
            toReturn += "\ndo: teraz";
        } else {
            month = end.getMonth() + 1;
            year = end.getYear() + 1900;
            toReturn += "\ndo: " + month + "/" + year;
        }

        return toReturn;
    }

    renderLanguages() {
        let languagesArr = [];
        for (var prop in this.state.languages) {
            let lanId = prop;
            let lanStr = "" + prop + " - " + this.state.languages[prop];
            languagesArr.push([lanId, lanStr]);
        }
        return (
            <ul>
                {languagesArr.map(language => (
                    <Button id={language[0]} onClick={e => this.handleCutLanguage(e)}>
                        {language[1]} x
                    </Button>
                ))}
            </ul>
        );
    }

    renderSkills() {
        if (this.state.skills.length === 0) return;
        return (
            <ul>
                {this.state.skills.map(skill => (
                    <Button id={skill} onClick={e => this.handleCutSkill(e)}>
                        {skill} x
                    </Button>
                ))}
            </ul>
        );
    }

    renderEdForm(formName) {
        //let itemStartTime = formName === "education" ?
        //let itemEndTime = formName === "education" ?
        let descriptionStr =
            formName === "education" ? "eduDescription" : "workDescription";
        let startTimeStr =
            formName === "education" ? "eduStartTime" : "workStartTime";
        let endTimeStr = formName === "education" ? "eduEndTime" : "workEndTime";
        return (
            <div id="complex_form_input_set">
                <Form.Group id="temp_data">
                    {this.renderEdu()}
                    <Form.Label column={""}>Od:</Form.Label>
                    <DatePicker
                        className="complex_form_input_item"
                        locale="pl"
                        dateFormat=" MM.yyyy"
                        selected={this.state.eduStartTime} //ogl
                        onChange={date => this.handleDateChange(startTimeStr, date)}
                        withPortal
                        showYearDropdown
                        dropdownMode="select"
                    />
                    <Form.Label column={""}>Do:</Form.Label>
                    <DatePicker
                        className="complex_form_input_item"
                        locale="pl"
                        dateFormat=" MM.yyyy"
                        selected={this.state.eduEndTime} //ogl
                        onChange={date => this.handleDateChange(endTimeStr, date)}
                        withPortal
                        showYearDropdown
                        dropdownMode="select"
                    />
                    <Form.Label column={""}>Nazwa:</Form.Label>
                    <Form.Control
                        className="complex_form_input_item"
                        inline
                        type="text"
                        //defaultValue={this.state.fullName}
                        placeholder="Nazwa, miejscowość, ..."
                        onBlur={e => this.handleBlur(e, descriptionStr)}
                    />
                    <Button
                        id="item_add_button"
                        variant="secondary"
                        type="submit"
                        onClick={e => this.addComplexItem(e, formName)}
                    >
                        + Dodaj
                    </Button>
                </Form.Group>
            </div>
        );
    }

    renderWorkForm(formName) {
        //let itemStartTime = formName === "education" ?
        //let itemEndTime = formName === "education" ?
        let descriptionStr =
            formName === "education" ? "eduDescription" : "workDescription";
        let startTimeStr =
            formName === "education" ? "eduStartTime" : "workStartTime";
        let endTimeStr = formName === "education" ? "eduEndTime" : "workEndTime";
        return (
            <div id="complex_form_input_set">
                <Form.Group id="temp_data">
                    {this.renderWork()}
                    <Form.Label column={""}>Od:</Form.Label>
                    <DatePicker
                        className="complex_form_input_item"
                        locale="pl"
                        dateFormat=" MM.yyyy"
                        selected={this.state.workStartTime} //ogl
                        onChange={date => this.handleDateChange(startTimeStr, date)}
                        withPortal
                        showYearDropdown
                        dropdownMode="select"
                    />
                    <Form.Label column={""}>Do:</Form.Label>
                    <DatePicker
                        className="complex_form_input_item"
                        locale="pl"
                        dateFormat=" MM.yyyy"
                        selected={this.state.workEndTime} //ogl
                        onChange={date => this.handleDateChange(endTimeStr, date)}
                        withPortal
                        showYearDropdown
                        dropdownMode="select"
                    />
                    <Form.Label column={""}>Nazwa:</Form.Label>
                    <Form.Control
                        className="complex_form_input_item"
                        inline
                        type="text"
                        //defaultValue={this.state.fullName}
                        placeholder="Nazwa, miejscowość, ..."
                        onBlur={e => this.handleBlur(e, descriptionStr)}
                    />
                    <Button
                        id="item_add_button"
                        variant="secondary"
                        type="submit"
                        onClick={e => this.addComplexItem(e, formName)}
                    >
                        + Dodaj
                    </Button>
                </Form.Group>
            </div>
        );
    }

    renderEdu() {
        let eduArr = [];
        for (let prop in this.state.education) {
            let eduId = prop;
            let eduStr = this.complexItemToStr(prop, this.state.education[prop]);
            eduArr.push([eduId, eduStr]);
        }
        return (
            <ul>
                {eduArr.map(edu => (
                    <Button id={edu[0]} variant="dark" onClick={e => this.handleCutEdu(e)}>
                        {edu[1]} x
                    </Button>
                ))}
            </ul>
        );
    }

    renderWork() {
        let eduArr = [];
        for (let prop in this.state.workExperience) {
            let eduId = prop;
            let eduStr = this.complexItemToStr(prop, this.state.workExperience[prop]);
            eduArr.push([eduId, eduStr]);
        }
        return (
            <ul>
                {eduArr.map(edu => (
                    <Button id={edu[0]} variant="dark" onClick={e => this.handleCutWork(e)}>
                        {edu[1]} x
                    </Button>
                ))}
            </ul>
        );
    }

    render() {
        return (
            <Container className="CVEditorPage">
                {window.innerWidth >= 768 ? (
                    <img className="cvPage__bgImage" src={bgImage} alt="tło" />
                ) : null}
                <Card className="CVEditorPage_card">
                    <Card.Header id="cv_page__title" as="h1">
                        Kreator CV
                    </Card.Header>
                    <Card.Body>
                        <Form id="cv_data" onSubmit={e => this.handleCVSubmit(e)}>
                            <Form.Label>
                                <h3>Dane osobowe</h3>
                            </Form.Label>
                            <Form.Group controlId="personalData">
                                <Col>
                                    <Form.Label column={""} sm="2">
                                        Imię i nazwisko:
                                    </Form.Label>
                                    <Form.Control
                                        inline
                                        type="text"
                                        required
                                        defaultValue={this.state.fullName}
                                        placeholder="Jan Przykładowy"
                                        onBlur={e => this.handleBlur(e, "fullName")}
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
                                        onChange={this.handleBirthDateChange}
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
                                        onBlur={e => this.handleBlur(e, "phoneNumber")}
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
                                        onBlur={e => this.handleBlur(e, "email")}
                                        className="cv_page_input"
                                    />
                                </Col>
                            </Form.Group>

                            <Form.Group id="complex-cv-fields">
                                <Form.Label>
                                    <h3>Edukacja</h3>
                                </Form.Label>
                                <br />
                                <Col>{this.renderEdForm("education")}</Col>
                            </Form.Group>

                            <Form.Group id="complex-cv-fields">
                                <Form.Label>
                                    <h3>Doświadczenie zawodowe</h3>
                                </Form.Label>
                                <br />
                                <Col>{this.renderWorkForm("workExperience")}</Col>
                            </Form.Group>

                            <Form.Group id="complex-cv-fields">
                                <Form.Label>
                                    <h3>Umiejętności</h3>
                                </Form.Label>
                                <Col>
                                    {this.renderSkills()}
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
                                        variant="secondary"
                                        onClick={e => {
                                            this.handleSkillAdd(e);
                                            console.log(this.state.skills);
                                        }}
                                    >
                                        + Dodaj
                                    </Button>
                                </Col>
                            </Form.Group>

                            <Form.Group id="complex-cv-fields">
                                <Form.Label>
                                    <h3>Języki obce</h3>
                                </Form.Label>
                                <Col>
                                    {this.renderLanguages()}
                                    <Form.Control
                                        id="languages"
                                        type="text"
                                        placeholder="Język"
                                        value={this.state.languageName}
                                        onChange={e => this.handleLanChange(e)}
                                    />
                                    <Form.Group controlId="exampleForm.ControlSelect1">
                                        <Form.Label>Poziom</Form.Label>
                                        <Form.Control
                                            as="select"
                                            onChange={e => this.handleLanLvlChange(e)}
                                            //    value={this.state.languageLevel}
                                        >
                                            <option value="podstawowy">podstawowy</option>
                                            <option value="komunikatywny">komunikatywny</option>
                                            <option value="biegły">biegły</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Button
                                        variant="secondary"
                                        onClick={language => this.handleAddLanguage(language)}
                                    >
                                        + Dodaj
                                    </Button>
                                </Col>
                            </Form.Group>
                            <ButtonToolbar id="cv_mgmt_button_toolbar">
                                <Button size="lg" variant="success" type="submit" id="saveButton">
                                    Generuj CV
                                </Button>
                                <Button
                                    size="lg"
                                    variant="danger"
                                    type="reset"
                                    id="discardButton"
                                    href="/user"
                                >
                                    Odrzuć
                                </Button>
                            </ButtonToolbar>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        );
    }
}

export default CVEditorPage;