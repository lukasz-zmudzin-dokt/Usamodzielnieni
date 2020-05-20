import React from 'react';
import { Bullet, StepInfo } from '../';

const ProgressBarFragment = ({ step, current, setCurrent, steps, setSteps }) => {
    const type = current ? 'current' :
                step ? 'visited' : 'next';

    return (
        <div className={`progressBarFragment__container progressBarFragment__container--${type}`}>
            {step && <Bullet step={step}/>}
            <div className={`progressBarFragment progressBarFragment--${type}`}>
                <div className="progressBarFragment__state"></div>
            </div>
            {step && <StepInfo
                step={step}
                setCurrent={setCurrent}
                steps={steps}
                setSteps={setSteps}
            />}
        </div>
    )
}

export default ProgressBarFragment;
