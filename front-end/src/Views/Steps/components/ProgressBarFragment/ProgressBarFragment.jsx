import React from 'react';
import { Bullet } from '../';

const ProgressBarFragment = ({ step, children }) => {
    const type = children ? 'current' :
                step ? 'visited' : 'next';

    return (
        <div className={`${type}ProgressBarFragment`}>
            {step && <Bullet step={step}/>}
            {children}
        </div>
    )
}

export default ProgressBarFragment;
