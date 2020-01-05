import React from "react";
import { Button, Form } from "react-bootstrap";
import {
  handleDateChange,
  handleBlur
} from "Views/CVEditorPage/functions/handlers";
import DatePicker from "react-datepicker";
import Work from "Views/CVEditorPage/components/Work";
import Edu from "Views/CVEditorPage/components/Edu";
import { addComplexItem } from "Views/CVEditorPage/functions/addComplexItem";

const renderItems = (component, formName) => {
  if (formName === "education") return Edu(component);
  else return Work(component);
};

const RenderForm = (component, formName) => {
  let descriptionStr = formName === "education" ? "eduDescription" : "workDescription";
  let startTimeStr = formName === "education" ? "eduStartTime" : "workStartTime";
  let endTimeStr = formName === "education" ? "eduEndTime" : "workEndTime";
  let placeStr = formName === "education" ? "eduPlace" : "workPlace";

  return (
    <div id="complex_form_input_set">
      <Form.Group id="temp_data">
        <div className="rendered_cv_area">
          {renderItems(component, formName)}
        </div>
        <Form.Label column={""}>
          Od:<span>&nbsp;</span>
        </Form.Label>
        <DatePicker
          className="complex_form_input_item"
          locale="pl"
          dateFormat=" MM.yyyy"
          selected={
            formName === "education"
              ? component.state.eduStartTime
              : component.state.workStartTime
          }
          onChange={date => handleDateChange(component.startTimeStr, date)}
          showMonthYearPicker
        />
        <span>&nbsp;&nbsp;&nbsp;</span>
        <Form.Label column={""}>
          Do:<span>&nbsp;</span>
        </Form.Label>
        <DatePicker
          className="complex_form_input_item"
          locale="pl"
          dateFormat=" MM.yyyy"
          selected={
            formName === "education"
              ? component.state.eduEndTime
              : component.state.workEndTime
          }
          onChange={date => handleDateChange(component, endTimeStr, date)}
          showMonthYearPicker
        />
        <br></br>
        <Form.Label column={""}>Miejsce:</Form.Label>
        <Form.Control
          className="complex_form_input_item"
          inline
          type="text"
          //defaultValue={this.state.fullName}
          placeholder="Nazwa szkoły/miejsca pracy"
          onBlur={e => handleBlur(component, e, placeStr)}
        />
        <Form.Label column={""}>Opis:</Form.Label>
        <Form.Control
          className="complex_form_input_item"
          inline
          type="text"
          //defaultValue={this.state.fullName}
          placeholder="Profil/stanowisko ..."
          onBlur={e => handleBlur(component, e, descriptionStr)}
        />
      </Form.Group>
      <Button
        id="item_add_button"
        variant="success"
        type="submit"
        onClick={e => addComplexItem(component, e, formName)}
      >
        + Dodaj
      </Button>
    </div>
  );
};

export default RenderForm;
