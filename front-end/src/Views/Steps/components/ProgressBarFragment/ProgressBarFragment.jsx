import React from 'react';
import { Bullet } from '../';

const ProgressBarFragment = ({ step, children }) => {
    const type = children ? 'current' :
                step ? 'visited' : 'next';

    return (
        <div className="progressBarFragment__container">
            {step && <Bullet step={step}/>}
            <div className={`progressBarFragment progressBarFragment--${type}`}></div>
            {children}
        </div>
    )
}

export default ProgressBarFragment;
