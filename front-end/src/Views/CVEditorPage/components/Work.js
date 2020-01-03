import React from "react";
import { Button } from "react-bootstrap";
import { handleCutWork } from "Views/CVEditorPage/functions/handlers";
import { complexItemToStr } from "Views/CVEditorPage/functions/complexItemToStr";

const Work = component => {
  let eduArr = [];
  for (let prop in component.state.workExperience) {
    let eduId = prop;
    let eduStr = complexItemToStr(prop, component.state.workExperience[prop]);
    eduArr.push([eduId, eduStr]);
  }

  if (eduArr.length === 0) return <div className="cv_page_verticalSpace" />;

  return (
    <ul>
      {eduArr.map(edu => (
        <Button
          id={edu[0]}
          variant="dark"
          onClick={e => handleCutWork(component, e)}
        >
          {edu[1]} x
        </Button>
      ))}
    </ul>
  );
};

export default Work;
