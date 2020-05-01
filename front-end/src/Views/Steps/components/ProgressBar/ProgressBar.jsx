import React from 'react'
import { ProgressBarFragment } from '../';

const ProgressBar = ({ steps, path, children }) => {
    return (
        <div>
            {path.map((stepId, i) => (
                <ProgressBarFragment
                    step={steps.find(step => step.id === stepId)}>
                    {(path.length - 1 === i) && children}
                </ProgressBarFragment>
            ))}
            <ProgressBarFragment />
        </div>
    )
}

export default ProgressBar
