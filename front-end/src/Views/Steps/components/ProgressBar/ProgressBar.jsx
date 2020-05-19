import React from 'react'
import { ProgressBarFragment } from '../';

const ProgressBar = ({ steps, path, setCurrent }) => {
    return (
        <div>
            {path.map((stepId, i) => (
                <ProgressBarFragment
                    key={stepId}
                    step={steps.find(step => step.id === stepId)}
                    current={path.length - 1 === i}
                    setCurrent={setCurrent} />
            ))}
            { steps.find(step => step.id === path[path.length - 1])?.next && <ProgressBarFragment />}
        </div>
    )
}

export default ProgressBar
