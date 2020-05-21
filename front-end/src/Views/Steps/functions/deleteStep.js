    export const deleteStep = (steps, step, setSteps) => {
        let parents = findParents(steps, step);

        if(step.type === 'main') {
            deleteSubsteps(steps, step, setSteps);
            let next = step.next.length > 0? step.next[0] : undefined;
            parents.forEach(parent => {
                parent.next.splice(parent.next.indexOf(step.id), 1);
                if(next && !parent.next.includes(next)) {
                    parent.next.push(next);
                }
            });
        } else {
            let parent = parents[0];
            let next = step.next.length > 0? step.next[0] : undefined;
            parent.next.splice(parent.next.indexOf(step.id), 1);
            if(next && !parent.next.includes(next)) {
                parent.next.push(next);
            }
        }

        steps.splice(steps.indexOf(step), 1);
        setSteps(steps);
    };

    const deleteSubsteps = (steps, step, setSteps) => {
        let nextSteps;
        while(true) {
            nextSteps = step.next;
            if(nextSteps.length > 0) {
                let substep = undefined;
                steps.forEach(element => {
                    if(nextSteps.includes(element.id) && element.type==='sub') {
                        substep = element.id;
                    }
                });
                if(!substep) {
                    return;
                }
                substep = steps.find(s => s.id === substep);
                deleteStep(steps, substep, setSteps);
            } else {
                return;
            }
        }
    }

    const findParents = (steps, step) => {
        let parents = [];
        steps.forEach(element => {
            if(element.next && element.next.includes(step.id)) {
                parents.push(element);
            }
        });

        return parents;
    };