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
  //console.log(steps);
  const parTitles = [];
  steps.forEach((s) => {
    if (s.type === "main") {
      parTitles.push(s.title);
    }
  });
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
      {!isEdit ? (
        <FormGroup
          type="select"
          header={`${
            isStep ? "Wybierz krok poprzedzający" : "Wybierz rodzica podkroku"
          } `}
          id="stepParent"
          required
          array={parTitles.length > 0 ? parTitles : ["Jako pierwszy krok"]}
          val={newStep?.parent}
          setVal={(val) =>
            setNewStep({
              ...newStep,
              parent: val,
            })
          }
        />
      ) : null}
      <FormGroup
        header={`Tytuł ${isStep ? "kroku" : "podkroku"}`}
        setVal={(val) => setNewStep({ ...newStep, title: val })}
        val={newStep?.title || ""}
        incorrect={`Podaj tytuł ${isStep ? "kroku." : "podkroku."}`}
        length={{ min: 1, max: 50 }}
        id="stepTitle"
        required
      />
      <FormGroup
        type="text"
        header="Film (link youtube)"
        id="stepVideo"
        //required
        val={newStep?.video || ""}
        length={{ min: 1, max: 100 }}
        setVal={(val) =>
          setNewStep({
            ...newStep,
            video: val,
          })
        }
      />

      <FormGroup
        type="textarea"
        header="Opis kroku"
        id="stepDescription"
        required
        incorrect="Podaj opis kroku."
        length={{ min: 1, max: 1000 }}
        val={newStep?.description}
        setVal={(val) =>
          setNewStep({
            ...newStep,
            description: val,
          })
        }
      />
    </>
  );
};

export default StepsForm;
