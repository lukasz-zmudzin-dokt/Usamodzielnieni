import React, { useState } from "react";
import FormGroup from "components/FormGroup";
import { Col, Form, Button } from "react-bootstrap";

const CorrectionForm = () => {
  const [validated, setValidated] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [feedback, setFeedback] = useState({
    basicInfo: "",
    schools: "",
    experiences: "",
    skills: "",
    languages: "",
    additionalInfo: "",
  });
  const submit = async (event) => {
    setDisabled(true);
    const form = event.currentTarget;
    console.log(feedback);
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setDisabled(false);
    setValidated(true);
  };
  return (
    <Form
      onSubmit={submit}
      noValidate
      validated={validated}
      className="CVCorrection__form"
    >
      <FormGroup
        header="Dane osobowe"
        id="basic_info"
        type="textarea"
        setVal={(val) => setFeedback({ ...feedback, basicInfo: val })}
        val={feedback.basicInfo}
      />
      <FormGroup
        header="Edukacja"
        id="schools"
        type="textarea"
        setVal={(val) => setFeedback({ ...feedback, schools: val })}
        val={feedback.schools}
      />
      <FormGroup
        header="Doświadczenie zawodowe"
        id="experiences"
        type="textarea"
        setVal={(val) => setFeedback({ ...feedback, experiences: val })}
        val={feedback.experiences}
      />
      <FormGroup
        header="Umiejętności"
        id="skills"
        type="textarea"
        setVal={(val) => setFeedback({ ...feedback, skills: val })}
        val={feedback.skills}
      />
      <FormGroup
        header="Języki obce"
        id="languages"
        type="textarea"
        setVal={(val) => setFeedback({ ...feedback, languages: val })}
        val={feedback.languages}
      />
      <FormGroup
        header="Dodatkowe uwagi"
        id="additional_info"
        type="textarea"
        setVal={(val) => setFeedback({ ...feedback, additionalInfo: val })}
        val={feedback.additionalInfo}
      />
      <Button variant="primary" type="submit" className="" disabled={disabled}>
        {disabled ? "Ładowanie..." : "Dodaj"}
      </Button>
    </Form>
  );
};

export default CorrectionForm;
