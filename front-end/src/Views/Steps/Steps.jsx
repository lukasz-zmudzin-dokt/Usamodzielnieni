import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { ProgressBar } from './components';

const Steps = () => {
    const [steps, setSteps] = useState([
        { id: '1', type: 'main', title: 'Tytuł głównego kroku 1', value: 'Opis kroku 1 wraz z filmikami.', next: ['2'] },
        { id: '2', type: 'main', title: 'Tytuł głównego kroku 2', value: 'Opis kroku 2 wraz z filmikami.', next: ['3', '5'] },
        { id: '3', type: 'sub', title: 'Tytuł podkroku 2.1', value: 'Opis kroku 2.1 wraz z filmikami.', next: ['4'] },
        { id: '4', type: 'sub', title: 'Tytuł podkroku 2.2', value: 'Opis kroku 2.2 wraz z filmikami.', next: ['5'] },
        { id: '5', type: 'main', title: 'Tytuł głównego kroku 3', value: 'Opis kroku 3 wraz z filmikami.', next: ['6'] },
        { id: '6', type: 'sub', title: 'Tytuł podkroku 3.1', value: 'Opis kroku 3.1 wraz z filmikami.' },
    ]);
    const [path, setPath] = useState(['1']);

    const setCurrent = (id) => {
        console.log(id)
        const index = path.indexOf(id);

        if (index >= 0) {
            setPath(path.slice(0, index + 1));
        } else {
            setPath([...path, id]);
        }
    }

    return (
        <Container>
            <h1>Kroki usamodzielnienia</h1>
            <ProgressBar steps={steps} path={path} setCurrent={setCurrent} setSteps={setSteps} />
        </Container>
    )
}

export default Steps;
