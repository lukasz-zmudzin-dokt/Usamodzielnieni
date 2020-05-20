import React from "react";

const Bullet = ({ step }) => {
  return (
    <>
      <div className={`bullet bullet--${step.type}`}>
        {step.type === "main" && <span>{step.title}</span>}
      </div>
      {step.type === "sub" && (
        <div className="bullet__title">
          <span>{step.title}</span>
        </div>
      )}
    </>
  );
};

export default Bullet;
