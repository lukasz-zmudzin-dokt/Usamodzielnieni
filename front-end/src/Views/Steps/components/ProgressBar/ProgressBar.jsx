import React, { useState, useEffect, useContext } from "react";
import { ProgressBarFragment } from "../";
import proxy from "config/api";
import { Alert, Button } from "react-bootstrap";
import { deleteStep, findParents } from "../../functions/deleteStep";
import { DeletionModal } from "components";
import { staffTypes } from "constants/staffTypes";
import { UserContext } from "context";
import { NewStep, EditStep } from "../";

const getRoot = async () => {
  let url = `${proxy.steps}root`; // TODO
  const headers = {
    "Content-Type": "application/json",
  };
  const response = await fetch(url, { method: "GET", headers });
  if (response.status !== 200) {
    throw response.status;
  }
  return await response.json();
};

const createRoot = async (token) => {
  let url = `${proxy.steps}root/`;

  const root = {
    title: "Korzeń",
    description: "Korzeń drzewa",
  };

  const headers = {
    "Content-Type": "application/json",
    Origin: null,
  };

  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(root),
  });

  if (response.status !== 200) {
    throw await response.json();
  }
  return await response.json();
};

const getStep = async (id) => {
  let url = `${proxy.steps}step/${id}`; // TODO
  const headers = {
    "Content-Type": "application/json",
  };
  const response = await fetch(url, { method: "GET", headers });
  if (response.status !== 200) {
    throw response.status;
  }
  return await response.json();
};

const getChildren = async (step, mainSteps) => {
  // console.log(step, " step ", steps, " steps ");
  if (step.children.length > 0) {
    const childrens = await Promise.all(
      step.children.map((item) => getStep(item.id))
    );

    mainSteps = childrens.concat(mainSteps);
    // childrens.forEach((item) => mainSteps.push(item));

    childrens.forEach(async (item) => {
      if (item.children.length > 0) {
        mainSteps = await getChildren(item, mainSteps);
      }
    });
  }
  console.log(mainSteps);
  return mainSteps;
};

const ProgressBar = () => {
  const [steps, setSteps] = useState([]);
  const [root, setRoot] = useState();
  const [path, setPath] = useState(["1"]);
  //const [path, setPath] = useState([]);
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
        res = await getRoot();
        // console.log(res);
        setRoot(res);
        if (res) {
          let mainSteps = [];
          mainSteps = await getChildren(res, mainSteps);
          console.log(mainSteps);
          extractSteps(mainSteps);
        } else {
          await createRoot();
        }
      } catch (e) {
        setError(true);
        return;
      }
    };

    loadSteps();
  }, []);

  // console.log(steps);

  const extractSteps = (steps) => {
    let children = [];
    steps.forEach((step) => {
      step.type = "main";
      step.substeps.forEach((substep) =>
        children.push({ ...substep, type: "sub" })
      );
    });
    // console.log(steps.length, children);
    setSteps(...steps, ...children);
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
    let step = steps.find((s) => s.id === path[path.length - 1]);
    deleteStep(steps, step, setSteps);
    setWantsDelete(false);
    let newPath = path;
    newPath.pop();
    setPath(newPath);
  }

  return (
    msg || (
      <div>
        {/* <DeletionModal
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
            <NewStep
              steps={steps}
              show={showNew}
              handleClose={() => setShowNew(false)}
            />
            <EditStep
              steps={steps}
              step={steps.find((item) => item.id === path[path.length - 1])}
              show={showEdit}
              handleClose={() => setShowEdit(false)}
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
            path={path}
          />
        ))}
        {steps.find((step) => step.id === path[path.length - 1])?.next && (
          <ProgressBarFragment />
        )}*/}
      </div>
    )
  );
};

export default ProgressBar;

// const tmpSteps = [
//   {
//     id: "1",
//     type: "main",
//     title:
//       "Tytuł głównego kroku 1 123 123 123 123 123 123 123 123 123 123 123 123 ",
//     description: "Opis kroku 1 wraz z filmikami.",
//     next: [
//       { id: "2", choiceName: "Tak" },
//       { id: "5", choiceName: "Nie" },
//     ],
//   },
//   {
//     id: "2",
//     type: "main",
//     title:
//       "Tytuł głównego kroku 2 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123",
//     description: "Opis kroku 2 wraz z filmikami.",
//     next: [{ id: "3", choiceName: "Dalej" }],
//   },
//   {
//     id: "3",
//     type: "sub",
//     title:
//       "Tytuł podkroku 2.1 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123",
//     description: "Opis kroku 2.1 wraz z filmikami.",
//     next: [{ id: "4", choiceName: "Dalej" }],
//   },
//   {
//     id: "4",
//     type: "sub",
//     title: "Tytuł podkroku 2.2",
//     description: "Opis kroku 2.2 wraz z filmikami.",
//     next: [{ id: "5", choiceName: "Dalej" }],
//   },
//   {
//     id: "5",
//     type: "main",
//     title: "Tytuł głównego kroku 3",
//     description: "Opis kroku 3 wraz z filmikami.",
//     next: [{ id: "6", choiceName: "Dalej" }],
//   },
//   {
//     id: "6",
//     type: "sub",
//     title: "Tytuł podkroku 3.1",
//     description: "Opis kroku 3.1 wraz z filmikami.",
//     next: [{ id: "1", choiceName: "początek" }],
//   },
// ];
