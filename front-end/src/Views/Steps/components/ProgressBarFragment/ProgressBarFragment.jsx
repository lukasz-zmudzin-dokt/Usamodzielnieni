import React from "react";
import { Bullet } from "../";
import StepCard from "../StepCard/StepCard";

const ProgressBarFragment = ({ step, current, setCurrent }) => {
  const type = current ? "current" : step ? "visited" : "next";

  return (
    <div>
      <div
          className={`progressBarFragment__container progressBarFragment__container--${type}`}
      >
        {step && <Bullet step={step} />}
        <div className={`progressBarFragment progressBarFragment--${type}`}>
          <div className="progressBarFragment__state"></div>
        </div>
      </div>
      {step && <StepCard step={step} setCurrent={setCurrent} />}
    </div>
  );
};

export default ProgressBarFragment;
