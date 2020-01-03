import { complexItemToStr } from "Views/CVEditorPage/functions/complexItemToStr";

export const addComplexItem = (component, e, arrayName) => {
  e.preventDefault();
  let array, itemDescription, itemStartTime, itemEndTime, itemPlace;
  if (arrayName === "education") {
    array = component.state.education;
    itemDescription = component.state.eduDescription;
    itemStartTime = component.state.eduStartTime;
    itemEndTime = component.state.eduEndTime;
    itemPlace = component.state.eduPlace;
  } else {
    array = component.state.workExperience;
    itemDescription = component.state.workDescription;
    itemStartTime = component.state.workStartTime;
    itemEndTime = component.state.workEndTime;
    itemPlace = component.state.workPlace;
  }

  let descrStr =
    arrayName === "education" ? "eduDescription" : "workDescription";
  let startStr = arrayName === "education" ? "eduStartTime" : "workStartTime";
  let endStr = arrayName === "education" ? "eduEndTime" : "workEndTime";
  let placeStr = arrayName === "education" ? "eduPlace" : "workPlace";

  let newItemList = array;
  let newItemProps = [itemStartTime, itemEndTime, itemPlace];

  if (itemDescription !== "") {
    newItemList[itemDescription] = newItemProps;
  }

  component.setState({
    [arrayName]: newItemList,
    [descrStr]: "",
    [startStr]: new Date(),
    [endStr]: undefined,
    [placeStr]: undefined
  });

  for (let prop in component.state.education) {
    console.log(complexItemToStr(prop, component.state.education[prop]));
  }

  console.log(component.state.workExperience);
};
