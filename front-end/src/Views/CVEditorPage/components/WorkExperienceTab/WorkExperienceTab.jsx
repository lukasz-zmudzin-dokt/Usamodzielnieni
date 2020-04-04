import React from "react";
import movie_3 from "assets/movie_3.png";
import { CVEditorTab, ActionWithDate } from "../";

const WorkExperienceTab = ({ data, onChange, onPrevClick, onNextClick, comments, loading }) => (
    <CVEditorTab
        title="Doświadczenie zawodowe"
        movie={movie_3}
        onPrevClick={onPrevClick}
        onNextClick={onNextClick}
        comments={comments}
        loading={loading}
    >
        <ActionWithDate data={data} onChange={onChange} />
    </CVEditorTab>
)

export default WorkExperienceTab;