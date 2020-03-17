import React from "react";
import movie_3 from "../../../assets/movie_3.png";
import CVEditorTab from 'Views/CVEditorPage/components/CvEditorTab';
import ActionWithDate from "./ActionWithDate";

const WorkExperienceTab = ({ data, onChange, onPrevClick, onNextClick, comments }) => (
    <CVEditorTab
        title="Doświadczenie zawodowe"
        movie={movie_3}
        onPrevClick={onPrevClick}
        onNextClick={onNextClick}
        comments={comments}
    >
        <ActionWithDate data={data} onChange={onChange} />
    </CVEditorTab>
)

export default WorkExperienceTab;