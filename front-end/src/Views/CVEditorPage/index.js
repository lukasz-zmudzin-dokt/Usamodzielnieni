import React from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import 'Views/CVEditorPage/style.css';
import Form from "react-bootstrap/Form";

class CVEditorPage extends React.Component { //nie działa, jest do baza do zmian

    constructor(props) {
        super(props);
        this.state = {
            fullName: "a", //czy w rejestracji będzie imię i nazwisko?
            birthDate: "", //defaultowo formularz, potem może jakiś MonthPicker albo DatePicker
            phoneNumber: "",
            email: "", //import z db?
            education: "",
            workExperience: "",
            skills: "",
            languages: "",
        };
        this.handleBlur = this.handleBlur.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    // listenery do poprawy
    handleBlur = e => {
        const { type, value } = e.target;
        this.setState({
            [type]: value
        });
    };

    handleSubmit = e => {
        alert('Podano imię: ' + this.state.fullName);
        e.preventDefault();
    };


    render() {
        const { fullName, birthDate, phoneNumber, email, education, workExperience, skills, languages } = this.state;
        const { handleBlur, handleSubmit } = this;
        return (
            <Container className = "CVEditorPage">
                <h1 className="display-4">Kreator CV</h1><br/>
                <p><h3>Dane osobowe</h3></p>
                <Form id="data" onSubmit={handleSubmit}>
                    <Form id="personalData">
                        Imię i nazwisko: <input id="name" type="text" ref={fullName} placeholder="Imię i nazwisko" onBlur={e => handleBlur(e)}/><br/><br/>
                        Data urodzenia: <input id="birthDate" type="text" ref={birthDate} onBlur={handleBlur}/><br/><br/>
                        Numer telefonu: <input id="phone" type="text" ref={phoneNumber} onBlur={handleBlur}/><br/><br/>
                        Email: <input id="email" type="text" ref={email} onBlur={handleBlur}/>
                    </Form><br/>
                    <p><h3>Edukacja</h3></p>
                    <Form id="education">
                        <input id="education" type="text" ref={education} onBlur={handleBlur}/>
                    </Form><br/>
                    <p><h3>Doświadczenie zawodowe</h3></p>
                    <Form id="workExperience">
                        <input id="workexp" type="text" ref={workExperience} onBlur={handleBlur}/>
                    </Form><br/>
                    <p><h3>Umiejętności</h3></p>
                    <form id="skills">
                        <input id="skills" type="text" ref={skills} onBlur={handleBlur}/>
                    </form><br/>
                    <p><h3>Języki obce</h3></p>
                    <Form id="languages">
                        <input id="languages" type="text" ref={languages} onBlur={handleBlur}/>
                    </Form>
                    <br/>
                    <Button type="submit" id="saveButton">Zapisz</Button>
                </Form>
            </Container>
        );
    }
}

export default CVEditorPage;