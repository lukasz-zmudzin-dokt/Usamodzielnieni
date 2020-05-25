import React, { useState, useEffect, useContext } from "react";
import { ProgressBarFragment } from "../";
import proxy from "config/api";
import { Alert, Button } from "react-bootstrap";
import { deleteStep, findParents } from "../../functions/deleteStep";
import { DeletionModal } from "components";
import { staffTypes } from "constants/staffTypes";
import { UserContext } from "context";
import { NewStep, EditStep } from "../";
import { getDefaultNormalizer } from "@testing-library/react";

const getSteps = async () => {
  let url = `${proxy.steps}`; // TODO
  const headers = {
    "Content-Type": "application/json",
  };
  const response = await fetch(url, { method: "GET", headers });
  if (response.status !== 200) {
    throw response.status;
  }
  let list = await response.json();
  list = mapSteps(list);

  return list;
};

const mapSteps = (list) => {
  let unpacked = [];

  list.forEach((main) => {
    main.type = "main";
    unpacked.push(main);
    main.substeps.forEach((sub) => {
      sub.type = "sub";
      unpacked.push(sub);
    });
  });
  return unpacked.map((step) => {
    return {
      id: step.id,
      type: step.type,
      title: step.title,
      description: step.description,
      next: getNext(step, unpacked),
    }
  });
};

const getNext = (step, list) => {
  let next = [];
  if(step.type === "main") {
    if(step.substeps.length > 0) {
      next.push({id: step.substeps[0].id, choiceName: "Dalej"});
    }
    step.children.forEach((child) => {
      next.push({id: child.id, choiceName: child.title});
    });
  } else {
    let parent = list.find((s) => s.id === step.parent);
    if(step.order + 1 < parent.substeps.length) {
      next = [{id: parent.substeps[step.order + 1].id, choiceName: "Dalej"}];
    } else {
      next = getNext(parent, list);
      next.splice(0, 1);
    }
  }
  return next;
}

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
    const loadSteps = async () => {
      let res;
      try {
        res = await getSteps();
        let root = res[0];
        res.splice(0, 1);
        setPath([root.next[0].id]);
        setSteps(res);
      } catch (e) {
        setError(true);
        return;
      }
    };

    loadSteps();
  }, [setSteps, setPath]);

  console.log(steps);


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
    //deleteStep(steps, step, setSteps);
    res = await fetch(`https://usamo-back.herokuapp.com/steps/step/${id}/delete/`, {});
    setWantsDelete(false);
    let newPath = path;
    newPath.pop();
    setPath(newPath);
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
              <Button onClick={() => setShowEdit(true)}>Edytuj ten krok</Button>
              <Button className="ml-3" onClick={() => setShowNew(true)}>
                Dodaj nowy krok
              </Button>
            </div>
            {/*<NewStep
              steps={steps}
              show={showNew}
              handleClose={() => setShowNew(false)}
            />
            <EditStep
              steps={steps}
              step={steps.find((item) => item.id === path[path.length - 1])}
              show={showEdit}
              handleClose={() => setShowEdit(false)}
            />*/}
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