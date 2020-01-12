import { sendData } from "Views/CVEditorPage/functions/other.js";
import { createCVObject } from "Views/CVEditorPage/functions/createCVObject.js";

export const handleDateChange = (component, dateFieldName, date) => {
  component.setState({
    [dateFieldName]: date
  });
};

export const handleBlur = (component, e, val) => {
  component.setState({
    [val]: e.target.value
  });
};

export const handleCVSubmit = (component, e) => {
  sendData(e, createCVObject(component, e));
  e.preventDefault();
};

export const handleBirthDateChange = (component, date) => {
  component.setState({
    birthDate: date
  });
};

export const handleAddLanguage = (component, e) => {
  let newLanguages = component.state.languages;

  const { languageName, languageLevel } = component.state;

  let correctName = languageName !== "";

  if (correctName) {
    newLanguages[languageName] = languageLevel;
    component.setState({
      languages: newLanguages
    });

    component.setState({
      languageName: ""
    });
  }
};

//

export const handleLanChange = (component, e) => {
  component.setState({
    languageName: e.target.value
  });
};

export const handleLanLvlChange = async (component, e) => {
  var value = await e.target.value;

  component.setState({ languageLevel: value });
};

export const handleSkillAdd = (component, e) => {
  let newSkills = component.state.skills;
  let name = component.state.skillToAdd;
  let correctName = name !== "";

  if (correctName && component.state.skills.indexOf(component.state.skillToAdd) === -1) {
    newSkills.push(name);

    component.setState({
      skills: newSkills
    });

    component.setState({
      skillToAdd: ""
    });
  }
};

export const handleCutSkill = (component, e) => {
  let items = component.state.skills;
  let index = component.state.skills.indexOf(e.target.id);

  if (index !== -1) {
    items.splice(index, 1);
    component.setState({
      skills: items
    });
  }
};

export const handleCutComplexItem = (component, itemType, e) => {
  let newItemList = {};
  switch (itemType) {
    case "education":  newItemList = component.state.education; break;
    case "workExperience": newItemList = component.state.workExperience; break;
    case "languages": newItemList = component.state.languages; break;
  }
  let toDeleteString = e.target.id;
  let toDelete = toDeleteString.split("&")[0];
  delete newItemList[toDelete];

  component.setState({
    [itemType]: newItemList
  });
};
