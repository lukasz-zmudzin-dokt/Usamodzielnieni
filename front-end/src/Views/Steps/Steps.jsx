import React, { useState, useContext } from "react";
import { Container, Button } from "react-bootstrap";
import { ProgressBar } from "./components";
import { NewStep, EditStep } from "./components";
import { staffTypes } from "constants/staffTypes";
import { UserContext } from "context";

const Steps = () => {
  const [showEdit, setShowEdit] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const user = useContext(UserContext);
  const [steps, setSteps] = useState({
    children: [
      {
        id: "1",
        title: "Tytuł głównego kroku 1",
        description: "xDD",
        video: "",
        parent: "Tytuł głównego kroku 2",
      },
      {
        id: "2",
        type: "main",
        title: "Tytuł głównego kroku 2",
        value: "Opis kroku 2 wraz z filmikami.",
        next: ["3"],
      },
      {
        id: "3",
        type: "sub",
        title: "Tytuł podkroku 2.1",
        value: "Opis kroku 2.1 wraz z filmikami.",
        next: ["4"],
      },
      {
        id: "4",
        type: "sub",
        title: "Tytuł podkroku 2.2",
        value: "Opis kroku 2.2 wraz z filmikami.",
        next: ["5"],
      },
      {
        id: "5",
        type: "main",
        title: "Tytuł głównego kroku 3",
        value: "Opis kroku 3 wraz z filmikami.",
        next: ["6"],
      },
      {
        id: "6",
        type: "sub",
        title: "Tytuł podkroku 3.1",
        value: "Opis kroku 3.1 wraz z filmikami.",
      },
    ],
  });
  const [path, setPath] = useState(["1"]);

  const setCurrent = (id) => {
    const index = path.indexOf(id);

    if (index >= 0) {
      setPath(path.slice(0, index + 1));
    } else {
      setPath([...path, id]);
    }
  };

  return (
    <Container>
      <h1>Kroki usamodzielnienia</h1>
      {user.data.group_type.includes(staffTypes.BLOG_MODERATOR) ? (
        <>
          <Button onClick={() => setShowEdit(true)}>Edytuj ten krok</Button>
          <Button className="ml-3" onClick={() => setShowNew(true)}>
            Dodaj nowy krok
          </Button>
          <NewStep
            steps={steps}
            show={showNew}
            handleClose={() => setShowNew(false)}
          />
          <EditStep
            steps={steps}
            step={steps.children.find(
              (item) => item.id === path[path.length - 1]
            )}
            show={showEdit}
            handleClose={() => setShowEdit(false)}
          />
        </>
      ) : null}
      <ProgressBar steps={steps} path={path} setCurrent={setCurrent} />
    </Container>
  );
};

export default Steps;
