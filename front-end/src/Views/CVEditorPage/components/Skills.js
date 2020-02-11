import React from "react";
import { Button } from "react-bootstrap";
import { handleCutSkill } from "Views/CVEditorPage/functions/handlers";

const Skills = ({ component }) => {
  // if (component.state.skills.length === 0)
  // return <div className="cv_page_verticalSpace" />;
  return (
    <ul>
      {component.state.skills.map(skill => (
        <li className="list-inline-item">
          <Button
            variant="dark"
            id={skill}
            onClick={e => handleCutSkill(component, e)}
          >
            {skill} x
          </Button>
        </li>
      ))}
    </ul>
  );
};

export default Skills;
