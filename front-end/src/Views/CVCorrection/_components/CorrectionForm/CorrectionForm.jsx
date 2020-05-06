import React, { useState } from "react";
import FormGroup from "components/FormGroup";
import { Form, Button, Row, Alert } from "react-bootstrap";
import { sendFeedback } from "Views/CVCorrection/functions";
import { useHistory } from "react-router-dom";

const CorrectionForm = ({ id, token }) => {
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
  const history = useHistory();

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
      try {
        await sendFeedback(id, token, feedback);
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
        history.push("/cvApproval");
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
        length={{ min: 1, max: 1000 }}
      />
      <FormGroup
        header="Edukacja"
        id="schools"
        type="textarea"
        setVal={(val) => setFeedback({ ...feedback, schools: val })}
        val={feedback.schools}
        length={{ min: 1, max: 1000 }}
      />
      <FormGroup
        header="Doświadczenie zawodowe"
        id="experiences"
        type="textarea"
        setVal={(val) => setFeedback({ ...feedback, experiences: val })}
        val={feedback.experiences}
        length={{ min: 1, max: 1000 }}
      />
      <FormGroup
        header="Umiejętności"
        id="skills"
        type="textarea"
        setVal={(val) => setFeedback({ ...feedback, skills: val })}
        val={feedback.skills}
        length={{ min: 1, max: 1000 }}
      />
      <FormGroup
        header="Języki obce"
        id="languages"
        type="textarea"
        setVal={(val) => setFeedback({ ...feedback, languages: val })}
        val={feedback.languages}
        length={{ min: 1, max: 1000 }}
      />
      <FormGroup
        header="Dodatkowe uwagi"
        id="additional_info"
        type="textarea"
        setVal={(val) => setFeedback({ ...feedback, additionalInfo: val })}
        val={feedback.additionalInfo}
        length={{ min: 1, max: 1000 }}
      />
      {message}
      <Row className="justify-content-center m-0">
        <Button variant="primary" type="submit" disabled={disabled}>
          {disabled ? "Ładowanie..." : "Wyślij uwagi"}
        </Button>
      </Row>
    </Form>
  );
};

export default CorrectionForm;
