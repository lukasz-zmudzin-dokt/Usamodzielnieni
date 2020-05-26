import React, { useState, useEffect, useContext } from "react";
import { ProgressBarFragment } from "../";
import { Alert, Button } from "react-bootstrap";
import { deleteStep, findParents } from "../../functions/deleteStep";
import { DeletionModal } from "components";
import { staffTypes } from "constants/staffTypes";
import { UserContext } from "context";
import { NewStep, EditStep } from "../";
import { loadSteps } from "../../functions/loadSteps";

const ProgressBar = () => {
  const [steps, setSteps] = useState([]);
  const [root, setRoot] = useState();
  const [path, setPath] = useState([]);
  const [error, setError] = useState(false);
  const [wantsDelete, setWantsDelete] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const user = useContext(UserContext);
  const [showNew, setShowNew] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    loadSteps(setSteps, setPath, setRoot, setError);
  }, [setSteps, setRoot, setPath, setError]);

  const deletion = async () => {
    setWantsDelete(false);
    let stepId = path[path.length - 1];
    let res = await deleteStep(steps, stepId, user.token);
    if (res.status === 204) {
      await loadSteps(setSteps, setPath, setRoot, setError);
    }
  };

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
    deletion();
  }
  
  return (
    msg || (
      <div>
        <DeletionModal
          show={showModal}
          setShow={setShowModal}
          delConfirmed={setWantsDelete}
          question="Czy na pewno chcesz usunąć ten krok?"
        />
        {user.data.group_type.includes(staffTypes.BLOG_MODERATOR) ? (
          <>
            <div className="mb-3">
              <Button className="ml-3" onClick={() => setShowNew(true)}>
                Dodaj nowy krok
              </Button>
            </div>
            <NewStep
              steps={steps}
              show={showNew}
              handleClose={() => setShowNew(false)}
              root={root}
              setRoot={setRoot}
              setSteps={setSteps}
              setPath={setPath}
              setError={setError}
            />
            <EditStep
              steps={steps}
              step={steps.find((item) => item.id === path[path.length - 1])}
              show={showEdit}
              handleClose={() => setShowEdit(false)}
              setRoot={setRoot}
              setSteps={setSteps}
              setPath={setPath}
              setError={setError}
              root={root}
            />
          </>
        ) : null}
        {path.map((stepId, i) => (
          <ProgressBarFragment
            key={stepId}
            index={i}
            step={steps.find((step) => step.id === stepId)}
            current={path.length - 1 === i}
            setCurrent={setCurrent}
            wantsDelete={setShowModal}
            wantsEdit={setShowEdit}
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
