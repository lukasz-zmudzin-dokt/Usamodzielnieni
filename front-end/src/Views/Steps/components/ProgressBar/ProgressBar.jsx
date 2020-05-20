import React, { useState, useEffect } from "react";
import { ProgressBarFragment } from "../";
import proxy from "config/api";
import { Alert } from "react-bootstrap";

const tmpSteps = [
  {
    id: "1",
    type: "main",
    title:
      "Tytuł głównego kroku 1 123 123 123 123 123 123 123 123 123 123 123 123 ",
    value: "Opis kroku 1 wraz z filmikami.",
    next: [
      { id: "2", choiceName: "Tak" },
      { id: "5", choiceName: "Nie" },
    ],
  },
  {
    id: "2",
    type: "main",
    title:
      "Tytuł głównego kroku 2 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123",
    value: "Opis kroku 2 wraz z filmikami.",
    next: [{ id: "3", choiceName: "Dalej" }],
  },
  {
    id: "3",
    type: "sub",
    title:
      "Tytuł podkroku 2.1 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123",
    value: "Opis kroku 2.1 wraz z filmikami.",
    next: [{ id: "4", choiceName: "Dalej" }],
  },
  {
    id: "4",
    type: "sub",
    title: "Tytuł podkroku 2.2",
    value: "Opis kroku 2.2 wraz z filmikami.",
    next: [{ id: "5", choiceName: "Dalej" }],
  },
  {
    id: "5",
    type: "main",
    title: "Tytuł głównego kroku 3",
    value: "Opis kroku 3 wraz z filmikami.",
    next: [{ id: "6", choiceName: "Dalej" }],
  },
  {
    id: "6",
    type: "sub",
    title: "Tytuł podkroku 3.1",
    value: "Opis kroku 3.1 wraz z filmikami.",
  },
];

const getSteps = async () => {
  let url = `${proxy.steps}/list`; // TODO
  const headers = {
    "Content-Type": "application/json",
  };

  const response = await fetch(url, { method: "GET", headers });

  if (response.status !== 200) {
    // return tmpSteps;

    // eslint-disable-next-line no-unreachable
    throw response.status;
  }
  return response.json().then((chats) => mapSteps(chats));
};

const mapSteps = (steps) =>
  steps.map((step) => ({
    id: step.id,
    type: step.type,
    title: step.title,
    value: step.value,
    next: step.next,
    // TODO
  }));

const ProgressBar = () => {
  const [steps, setSteps] = useState();
  const [path, setPath] = useState(["1"]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadSteps = async () => {
      let res;
      try {
        res = await getSteps();
      } catch (e) {
        console.log(e);
        setError(true);
        return;
      }
      setSteps(res);
    };

    loadSteps();
  }, []);

  const setCurrent = (id) => {
    const index = path.indexOf(id);

    if (index >= 0) {
      setPath(path.slice(0, index + 1));
    } else {
      setPath([...path, id]);
    }
  };

  const msg = error ? (
    <Alert variant="danger">
      Wystąpił błąd podczas ładowania kroków usamodzielnienia.
    </Alert>
  ) : (
    !steps && <Alert variant="info">Ładowanie...</Alert>
  );

  return (
    msg || (
      <div>
        {path.map((stepId, i) => (
          <ProgressBarFragment
            key={stepId}
            step={steps.find((step) => step.id === stepId)}
            current={path.length - 1 === i}
            setCurrent={setCurrent}
          />
        ))}
        {steps.find((step) => step.id === path[path.length - 1])?.next && (
          <ProgressBarFragment />
        )}
      </div>
    )
  );
};

export default ProgressBar;
