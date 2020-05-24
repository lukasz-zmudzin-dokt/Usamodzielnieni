import React, { useState, useEffect } from "react";
import { ProgressBarFragment } from "../";
import proxy from "config/api";
import { Alert } from "react-bootstrap";
import { deleteStep, findParents } from "../../functions/deleteStep";
import { DeletionModal } from "components";

const tmpSteps = [
  {
    id: "1",
    type: "main",
    title:
      "Tytuł głównego kroku 1 123 123 123 123 123 123 123 123 123 123 123 123 ",
    description: "Opis kroku 1 wraz z filmikami.",
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
    description: "Opis kroku 2 wraz z filmikami.",
    next: [{ id: "3", choiceName: "Dalej" }],
  },
  {
    id: "3",
    type: "sub",
    title:
      "Tytuł podkroku 2.1 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123",
    description: "Opis kroku 2.1 wraz z filmikami.",
    next: [{ id: "4", choiceName: "Dalej" }],
  },
  {
    id: "4",
    type: "sub",
    title: "Tytuł podkroku 2.2",
    description: "Opis kroku 2.2 wraz z filmikami.",
    next: [{ id: "5", choiceName: "Dalej" }],
  },
  {
    id: "5",
    type: "main",
    title: "Tytuł głównego kroku 3",
    description: "Opis kroku 3 wraz z filmikami.",
    next: [{ id: "6", choiceName: "Dalej" }],
  },
  {
    id: "6",
    type: "sub",
    title: "Tytuł podkroku 3.1",
    description: "Opis kroku 3.1 wraz z filmikami.",
    next: [{ id: "1", choiceName: "początek" }],
  },
];

const getSteps = async () => {
  let url = `${proxy.steps}/list`; // TODO
  const headers = {
    "Content-Type": "application/json",
  };

  const response = await fetch(url, { method: "GET", headers });

  if (response.status !== 200) {
    return tmpSteps;

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
  //const [path, setPath] = useState([]);
  const [error, setError] = useState(false);
  const [wantsDelete, setWantsDelete] = useState(false);
  const [showModal, setShowModal] = useState(false);

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

  if (wantsDelete) {
    let step = steps.find((s) => s.id === path[path.length - 1]);
    deleteStep(steps, step, setSteps);
    setWantsDelete(false);
    let newPath = path;
    newPath.pop();
    setPath(newPath);
  }
  /*
  if(path.length === 0) {
    steps.forEach(step => {
        if(findParents(steps, step).length === 0) {
            let newPath = [];
            newPath.push(step.id);
            setPath(newPath);
        }
    });
  }
*/
  return (
    msg || (
      <div>
        <DeletionModal
          show={showModal}
          setShow={setShowModal}
          delConfirmed={setWantsDelete}
          question="Czy na pewno chcesz usunąć ten krok?"
        />
        {path.map((stepId, i) => (
          <ProgressBarFragment
            key={stepId}
            index={i}
            step={steps.find((step) => step.id === stepId)}
            current={path.length - 1 === i}
            setCurrent={setCurrent}
            wantsDelete={setShowModal}
            path={path}
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
