import React from "react";
import { Button } from "react-bootstrap";
import {handleCutComplexItem} from "../functions/handlers";

const Languages = component => {
  let languagesArr = [];
  for (var prop in component.state.languages) {
    let lanId = prop;
    let lanStr = "" + prop + " - " + component.state.languages[prop];
    languagesArr.push([lanId, lanStr]);
  }

  if (languagesArr.length === 0)
    return <div className="cv_page_verticalSpace" />;

  return (
    <ul>
      {languagesArr.map(language => (
        <Button
          variant="dark"
          id={language[0] + "&" + language[1]}
          onClick={e => handleCutComplexItem(component, "languages", e)}
        >
          {language[1]} x
        </Button>
      ))}
    </ul>
  );
};

export default Languages;
