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

  let newItemList = array;
  let newItemProps = [itemStartTime, itemEndTime, itemPlace];

  if (itemDescription !== "" && itemPlace !== "") {
    newItemList[itemDescription] = newItemProps;
  }

  if (arrayName === "education")
    component.setState({
      education: newItemList,
    });
  else
    component.setState({
      workExperience: newItemList,
    });

  for (let prop in component.state.education) {
    console.log(complexItemToStr(prop, component.state.education[prop]));
  }

  console.log(component.state);
};
