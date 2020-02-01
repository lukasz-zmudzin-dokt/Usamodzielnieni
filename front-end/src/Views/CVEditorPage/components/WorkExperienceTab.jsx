import React from "react";
import movie_3 from "../../../assets/movie_3.png";
import CVEditorTab from 'Views/CVEditorPage/components/CvEditorTab';
import ActionWithDate from "./ActionWithDate";

const WorkExperienceTab = ({ onPrevClick, onNextClick }) => (
    <CVEditorTab
        title="Doświadczenie zawodowe"
        movie={movie_3}
        onPrevClick={onPrevClick}
        onNextClick={onNextClick}
    >
        <ActionWithDate />
    </CVEditorTab>
)

export default WorkExperienceTab;