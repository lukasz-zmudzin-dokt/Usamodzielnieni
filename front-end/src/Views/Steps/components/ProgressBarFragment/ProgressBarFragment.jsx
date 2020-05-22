import React, { useEffect, useRef } from "react";
import { Bullet, StepCard } from "../";

const ProgressBarFragment = ({ step, current, index, setCurrent }) => {
  const ref = useRef(null);
  const type = current ? "current" : step ? "visited" : "next";

  useEffect(() => {
    if (current && ref !== null && index !== 0) {
      const space = ref.current.offsetTop - 10;
      window.scrollTo(0, space);
    }
  }, [step, current, index]);

  return (
    <div
      className={`progressBarFragment__container progressBarFragment__container--${type}`}
      ref={current ? ref : null}
    >
      {step && <Bullet step={step} />}
      <div className={`progressBarFragment progressBarFragment--${type}`}>
        <div className="progressBarFragment__state"></div>
      </div>
      {step && <StepCard step={step} setCurrent={setCurrent} />}
    </div>
  );
};

export default ProgressBarFragment;
