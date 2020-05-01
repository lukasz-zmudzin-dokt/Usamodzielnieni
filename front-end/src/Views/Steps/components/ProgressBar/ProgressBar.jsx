import React from 'react'
import { ProgressBarFragment } from '../';

const ProgressBar = ({ children }) => {
    return (
        <div>
            <ProgressBarFragment />
            <ProgressBarFragment />
            <ProgressBarFragment>
                {children}
            </ProgressBarFragment>
            <ProgressBarFragment />
        </div>
    )
}

export default ProgressBar
