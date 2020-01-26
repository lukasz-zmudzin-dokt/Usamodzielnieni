import React from "react";
import { Button } from "react-bootstrap";
import { complexItemToStr } from "Views/CVEditorPage/functions/complexItemToStr";
import { handleCutComplexItem } from "../functions/handlers";

const Edu = ({ component }) => {
  let eduArr = [];
  for (let prop in component.state.education) {
    let eduId = prop;
    let eduStr = complexItemToStr(prop, component.state.education[prop]);
    eduArr.push([eduId, eduStr]);
  }

  // if (eduArr.length === 0) return <div className="cv_page_verticalSpace" />;

  return (
    <ul>
      {eduArr.map(edu => (
        <li className="list-inline-item">
          <Button
            id={edu[0]}
            variant="dark"
            onClick={e => handleCutComplexItem(component, e)}
          >
            {edu[1]} x
          </Button>
        </li>
      ))}
    </ul>
  );
};

export default Edu;
