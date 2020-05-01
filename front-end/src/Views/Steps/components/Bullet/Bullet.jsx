import React from 'react';

const Bullet = ({ step }) => {
    return (
        <div className={`${step.type}Bullet`}>
            {step.title}
        </div>
    )
}

export default Bullet;
