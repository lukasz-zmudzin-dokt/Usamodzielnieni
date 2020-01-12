import React from "react";
import { Button } from "react-bootstrap";
import { complexItemToStr } from "Views/CVEditorPage/functions/complexItemToStr";
import { handleCutComplexItem } from "../functions/handlers";

const Work = ({ component }) => {
  let workArr = [];
  for (let prop in component.state.workExperience) {
    let workId = prop;
    let workStr = complexItemToStr(prop, component.state.workExperience[prop]);
    workArr.push([workId, workStr]);
  }

  // if (eduArr.length === 0) return <div className="cv_page_verticalSpace" />;

  return (
    <ul>
      {workArr.map(work => (
        <li className="list-inline-item">
          <Button
            id={work[0]}
            variant="dark"
            onClick={e => handleCutComplexItem(component, e)}
          >
            {work[1]} x
          </Button>
        </li>
      ))}
    </ul>
  );
};

export default Work;
