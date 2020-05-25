import React from "react";
import { FormGroup } from "components";

const StepsForm = ({
  type,
  setType,
  setValidated,
  setNewStep,
  newStep,
  steps,
  isEdit,
}) => {
  const stepsTypes = ["Krok główny", "Podkrok"];
  const isStep = type === stepsTypes[0];
  return (
    <>
      {!isEdit ? (
        <FormGroup
          type="select"
          header="Rodzaj kroku"
          id="stepType"
          array={stepsTypes}
          required
          val={type}
          setVal={(val) => {
            setType(val);
            setValidated(false);
          }}
        />
      ) : null}
      <FormGroup
        type="select"
        header={`${
          isStep ? "Wybierz krok poprzedzający" : "Wybierz rodzica podkroku"
        } `}
        id="stepParent"
        required
        array={steps.children.map((item) => item.title)}
        val={newStep.parent}
        setVal={(val) =>
          setNewStep({
            ...newStep,
            parent: val,
          })
        }
      />
      <FormGroup
        header={`Tytuł ${isStep ? "kroku" : "podkroku"}`}
        setVal={(val) => setNewStep({ ...newStep, title: val })}
        val={newStep.title || ""}
        incorrect={`Podaj tytuł ${isStep ? "kroku." : "podkroku."}`}
        length={{ min: 1, max: 50 }}
        id="stepTitle"
        required
      />
      <FormGroup
        type="text"
        header="Film (link youtube)"
        id="stepVideo"
        val={newStep.video || ""}
        setVal={(val) =>
          setNewStep({
            ...newStep,
            video: val,
          })
        }
      />
      {isStep ? (
        <FormGroup
          type="textarea"
          header="Opis kroku"
          id="stepDescription"
          required
          incorrect="Podaj opis kroku."
          val={newStep.description}
          setVal={(val) =>
            setNewStep({
              ...newStep,
              description: val,
            })
          }
        />
      ) : null}
    </>
  );
};

export default StepsForm;
