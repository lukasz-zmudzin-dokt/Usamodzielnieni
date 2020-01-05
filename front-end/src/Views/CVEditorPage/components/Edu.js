import React from "react";
import { Button } from "react-bootstrap";
import { handleCutEdu } from "Views/CVEditorPage/functions/handlers";
import { complexItemToStr } from "Views/CVEditorPage/functions/complexItemToStr";

const Edu = component => {
  let eduArr = [];
  for (let prop in component.state.education) {
    let eduId = prop;
    let eduStr = complexItemToStr(prop, component.state.education[prop]);
    eduArr.push([eduId, eduStr]);
  }

  if (eduArr.length === 0) return <div className="cv_page_verticalSpace" />;

  return (
    <ul>
      {eduArr.map(edu => (
        <Button
          id={edu[0] + "&" + edu[1]}
          variant="dark"
          onClick={e => handleCutEdu(component, e)}
        >
          {edu[1]} x
        </Button>
      ))}
    </ul>
  );
};

export default Edu;
