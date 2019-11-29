import React from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import 'Views/CVEditorPage/style.css';

class CVEditorPage extends React.Component { //nie działa, jest do baza do zmian
    state = {
        fullName: "", //czy w rejestracji będzie imię i nazwisko?
        birthDate: "", //defaultowo formularz, potem może jakiś MonthPicker albo DatePicker
        phoneNumber: "",
        email: "", //import z db?
        education: "",
        workExperience: "",
        skills: "",
        languages: ""
    };
    // listenery do poprawy
    onChange = e => {
        const type = e.target.type;
        const value = e.target.value;
        this.setState({
            [type]: value
        });
    };

    handleChange = event => {
        event.preventDefault();
        console.log(event.type + event.value);  //zmiana któregokolwiek z pól formularza wypisze tą zmianę, później zrobić nadpisywanie zmiennych
    };

    exportChanges = e => {
        e.preventDefault();
        console.log("data saved");
        // export...
    };


    render() {
        const { fullName, birthDate, phoneNumber, email, education, workExperience, skills, languages } = this.state;
        const { onChange, handleChange } = this;
        return (
            <Container className = "CVEditorPage">
                <h1 className="display-4">Kreator CV</h1>
                <p>Dane osobowe</p>
                <form onChange={handleChange} id="personalData">
                    Imię i nazwisko: <input id="name" type="text" value={fullName} onChange={this.onChange}/>
                    Data urodzenia: <input id="birthdate" type="text" value={birthDate} onChange={this.onChange}/>
                    Numer telefonu: <input id="phone" type="text" value={phoneNumber} onChange={this.onChange}/>
                    Email: <input id="email" type="text" value={email} onChange={this.onChange}/>
                </form>
                <p>Edukacja</p>
                <form onChange={handleChange} id="education">
                    <input id="education" type="text" value={education} onChange={onChange}/>
                </form>
                <p>Doświadczenie zawodowe</p>
                <form onChange={handleChange} id="workExperience">
                    <input id="workexp" type="text" value={workExperience} onChange={onChange}/>
                </form>
                <p>Umiejętności</p>
                <form onChange={handleChange} id="skills">
                    <input id="skills" type="text" value={skills} onChange={onChange}/>
                </form>
                <p>Języki obce</p>
                <form onChange={handleChange} id="languages">
                    <input id="langs" type="text" value={languages} onChange={onChange}/>
                </form>
                <Button onClick ={this.exportChanges} id="Save">Zapisz</Button>
            </Container>
        );
    }
}

export default CVEditorPage;