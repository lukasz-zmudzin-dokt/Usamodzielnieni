import React from "react";
import { Button } from "react-bootstrap";
import { handleCutSkill } from "Views/CVEditorPage/functions/handlers";

const Skills = component => {
  if (component.state.skills.length === 0)
    return <div className="cv_page_verticalSpace" />;
  return (
    <ul>
      {component.state.skills.map(skill => (
        <Button
          variant="dark"
          id={skill}
          onClick={e => handleCutSkill(component, e)}
        >
          {skill} x
        </Button>
      ))}
    </ul>
  );
};

export default Skills;
