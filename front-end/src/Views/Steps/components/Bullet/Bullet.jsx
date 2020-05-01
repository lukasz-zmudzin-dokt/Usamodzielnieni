import React from 'react';

const Bullet = ({ step }) => {
    return (
        <>
            <div className={`bullet bullet--${step.type}`}>
                {step.type === 'main' && step.title}
            </div>
            {step.type === 'sub' && <div className="bullet__title">{step.title}</div>}
        </>
    )
}

export default Bullet;
