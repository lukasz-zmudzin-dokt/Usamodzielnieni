import React, { useState } from "react";
import FormGroup from "components/FormGroup";
import { Form, Button, Row, Alert } from "react-bootstrap";
import { sendFeedback } from "Views/CVCorrection/functions";

const CorrectionForm = ({ data }) => {
  const [fail, setFail] = useState(false);
  const [msg, setMsg] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [feedback, setFeedback] = useState({
    basicInfo: "",
    schools: "",
    experiences: "",
    skills: "",
    languages: "",
    additionalInfo: "",
  });

  const checkIfNotEmpty = () => {
    for (let key in feedback) {
      if (feedback[key] !== "") {
        return true;
      }
    }
    return false;
  };

  const submit = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (checkIfNotEmpty()) {
      setDisabled(true);
      let res;
      try {
        res = sendFeedback(data.id, data.token, feedback);
        setFeedback({
          basicInfo: "",
          schools: "",
          experiences: "",
          skills: "",
          languages: "",
          additionalInfo: "",
        });
        setFail(false);
        setMsg("Pomyślnie przesłano uwagi.");
      } catch (err) {
        setFail(true);
        setMsg("Błąd serwera.");
      }
    } else {
      setFail(true);
      setMsg("Dodaj minimalnie jedną uwagę.");
    }
    setDisabled(false);
  };

  const message = msg ? (
    fail ? (
      <Alert variant="danger">{msg}</Alert>
    ) : (
      <Alert variant="success">{msg}</Alert>
    )
  ) : null;

  return (
    <Form onSubmit={submit} className="CVCorrection__form">
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
      {message}
      <Row className="justify-content-end m-0">
        <Button
          variant="primary"
          type="submit"
          className=""
          disabled={disabled}
        >
          {disabled ? "Ładowanie..." : "Wyślij uwagi"}
        </Button>
      </Row>
    </Form>
  );
};

export default CorrectionForm;
