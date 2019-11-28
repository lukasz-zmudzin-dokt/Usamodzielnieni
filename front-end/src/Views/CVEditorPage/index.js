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
                <!-- Większość z tego będzie podawane przy rejestracji, ale warto zostawić pole do zmiany -->
                <p>Dane osobowe</p>
                <form onChange={handleChange} id="personalData">
                    Imię i nazwisko: <input type="text" value={fullName} onChange={onChange}/>
                    Data urodzenia: <input type="text" value={birthDate} onChange={onChange}/>
                    Numer telefonu: <input type="text" value={phoneNumber} onChange={onChange}/>
                    Email: <input type="text" value={email} onChange={onChange}/>
                </form>
                <!-- DALEJ moja wizja: dalsze pola na początku nic nie wyświetlają, mają tylko przycisk "dodaj", który dodaje po kolei rekord edukacji, doświadczenia itd -->
                <p>Edukacja</p>
                <form onChange={handleChange} id="education">
                    <input type="text" value={education} onChange={onChange}/>
                </form>
                <p>Doświadczenie zawodowe</p>
                <form onChange={handleChange} id="workExperience">
                    <input type="text" value={workExperience} onChange={onChange}/>
                </form>
                <p>Umiejętności</p>
                <form onChange={handleChange} id="skills">
                    <input type="text" value={skills} onChange={onChange}/>
                </form>
                <p>Języki obce</p>
                <form onChange={handleChange} id="languages">
                    <input type="text" value={languages} onChange={onChange}/>
                </form>
                <!-- Przyciski zapisz i odrzuć (?), wrzuca dane wyżek do jakiejś kolekcji -->
                <Button onClick ={this.exportChanges} id="Save">Zapisz</Button>
            </Container>
        );
    }
}

export default CVEditorPage;