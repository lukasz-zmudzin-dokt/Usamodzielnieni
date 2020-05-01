import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import {
    ProgressBar,
    StepInfo
} from './components';

const Steps = () => {
    const [steps, setSteps] = useState([
        { id: '1', type: 'main', title: 'abc', value: 'asdasda', next: ['2', '5'] },
        { id: '2', type: 'main', title: 'sdf', value: 'asdasd asda', next: ['3'] },
        { id: '3', type: 'sub', title: 'weq', value: 'zxcz xczx', next: ['4'] },
        { id: '4', type: 'sub', title: 'vxc', value: 'asd asd a', next: ['5'] },
        { id: '5', type: 'main', title: '324', value: 'asdas d1', next: ['6'] },
        { id: '6', type: 'sub', title: 'tsx', value: 's d1w 1' },
    ]);
    const [path, setPath] = useState(['1', '2', '3', '4']);

    return (
        <Container>
            <h1>Kroki usamodzielnienia</h1>
            <ProgressBar steps={steps} path={path}>
                <StepInfo step={steps.find(step => step.id === path[path.length - 1])} />
            </ProgressBar>
        </Container>
    )
}

export default Steps;
