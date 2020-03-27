import React from "react";
import movie_2 from "../../../assets/movie_2.png";
import { CVEditorTab, ActionWithDate } from '.';

const EducationTab = ({ data, onChange, onPrevClick, onNextClick }) => (
    <CVEditorTab
        title="Edukacja"
        movie={movie_2}
        onPrevClick={onPrevClick}
        onNextClick={onNextClick}
    >
        <ActionWithDate data={data} onChange={onChange} />
    </CVEditorTab>
)

export default EducationTab;